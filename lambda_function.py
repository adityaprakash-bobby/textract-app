import json
import boto3

def lambda_handler(event, context):
    
    s3 = boto3.resource('s3')
    s3_properties = event.get('Records')[0].get('s3')
    bucket_name   = s3_properties.get('bucket').get('name')
    uploaded_file = s3_properties.get('object').get('key')
        
    json_response = response_detect_text(bucket_name, uploaded_file)
    
    s3object = s3.Object('test-lambda-tt', uploaded_file.replace('.', '_') + '.json')
    
    s3object.put(
        Body=(bytes(json.dumps(json_response).encode('UTF-8')))
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps(json_response)
    }

def response_detect_text(bucket_name, document_name):
    
    bucket           = bucket_name
    document         = document_name
    texttract_client = boto3.client('textract')

    # Process documents from S3
    response = texttract_client.detect_document_text(
        Document={
            'S3Object': {
                'Bucket': bucket, 
                'Name': document
            }
        }
    )

    #Get the text blocks
    blocks=response['Blocks']
    
    return {
        'statusCode': 200,
        'body': json.dumps(blocks)
    }