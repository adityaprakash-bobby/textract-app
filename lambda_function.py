import json
import boto3

def labmda_handler(event, context):

    bucket           = 'test-static-pool'
    document         = 'process.png'
    texttract_client = boto3.resource('textract')

    # Process documents from S3
    response = texttract_client.detect_document_text(
        Document = {
            'S3Object': {
                'Bucket': bucket,
                'Name': document
            }
    )

    blocks = response['Blocks']

    return {
        'statusCode':200,
        'body': json.dumps(blocks)
    }