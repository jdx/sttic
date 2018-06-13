import {Command, flags} from '@oclif/command'
import * as AWS from 'aws-sdk'
import * as fs from 'fs'
import * as Mime from 'mime-types'

AWS.config.apiVersion = '2006-03-01'

export default class Push extends Command {
  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'target', required: true}]

  async run() {
    const {args} = this.parse(Push)
    const [type, id] = args.target.split(':')
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
      this.log(`Creating bucket: ${Bucket}`)
      await S3.createBucket({Bucket}).promise()
    }
    const createWebsite = async () => {
      try {
        await S3.putBucketWebsite({
          Bucket,
          WebsiteConfiguration: {
            ErrorDocument: {Key: 'error.html'},
            IndexDocument: {Suffix: 'index.html'},
          },
        }).promise()
      } catch (err) {
        if (err.code === 'NoSuchBucket') {
          await createBucket()
          await createWebsite()
        } else throw err
      }
    }
    const uploadFile = async (file: string) => {
      await S3.upload({
        Bucket,
        Key: file,
        Body: fs.createReadStream(file),
        ContentType: Mime.lookup(file) || undefined,
        ACL: 'public-read',
      }).promise()
    }
    await createWebsite()
    await uploadFile('index.html')
  }
}
