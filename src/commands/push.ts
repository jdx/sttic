import {Command, flags} from '@oclif/command'
import * as AWS from 'aws-sdk'
import ux from 'cli-ux'
import * as fs from 'fs-extra'
import * as Mime from 'mime-types'
import * as pMap from 'p-map'
import * as qq from 'qqjs'

AWS.config.apiVersion = '2006-03-01'

export async function gather(root = process.cwd()) {
  let files = await qq.globby(root)
  return files
}

function bytes(n: number): string {
  const [num, suffix] = require('filesize')(n, {output: 'array'})
  return num.toFixed(1) + ` ${suffix}`
}

export async function filesize(...files: string[]) {
  let size = 0
  for (let name of files) {
    const fi = await fs.stat(name)
    size += fi.size
  }
  return size
}

export default class Push extends Command {
  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'target', required: true}]

  async run() {
    const {args} = this.parse(Push)
    const [type, id] = args.target.split(':')
    if (!id) this.error('USAGE: sttic push s3:MYBUCKET')
    switch (type) {
      case 's3':
        return this.s3(id)
        break
      default:
        this.error(`unsupported type: ${type}`)
    }
  }

  private async s3(bucket: string) {
    const Bucket = bucket
    const S3 = new AWS.S3()
    const createBucket = async () => {
      ux.action.start(`Creating bucket: ${Bucket}`)
      await S3.createBucket({Bucket}).promise()
      ux.action.stop()
    }
    const createWebsite = async () => {
      try {
        ux.action.start('Configuring website')
        await S3.putBucketWebsite({
          Bucket,
          WebsiteConfiguration: {
            ErrorDocument: {Key: 'error.html'},
            IndexDocument: {Suffix: 'index.html'},
          },
        }).promise()
        ux.action.stop()
      } catch (err) {
        if (err.code === 'NoSuchBucket') {
          await createBucket()
          await createWebsite()
        } else throw err
      }
    }
    await createWebsite()
    const files = await gather()
    const maxSize = await filesize(...files)
    let curSize = 0
    ux.action.start('Uploading files')
    const uploadFile = async (file: string) => {
      await S3.upload({
        Bucket,
        Key: file,
        Body: fs.createReadStream(file),
        ContentType: Mime.lookup(file) || undefined,
        ACL: 'public-read',
      })
      .on('httpUploadProgress', e => {
        curSize += e.loaded
        ux.action.status = `${bytes(curSize)}/${bytes(maxSize)}`
      })
      .promise()
    }
    await pMap(files, uploadFile, {concurrency: 4})
  }
}
