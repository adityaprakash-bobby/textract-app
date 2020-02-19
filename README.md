# textract-app
A simple application using textract to detect text in a document (image format JPEG/PNG) and show up the result JSON

## Architecture
```                                              ____________
                                ======           |          |             ======
putObjectEvent from UI ------>  \ S3 / --------> | textract | ----------> \ S3 / -------> Read Back from saved File to display on UI
                                 \__/            |__________|              \__/
```

## Configurations

- Bucket should have CORS enabled
- Limited Public Access should be granted
- Congnito Identity Pool (here, Unauthorized User, but authenticate an user before you authorize) with S3 Access to read and write
- Lambda must have service role to access Textract

### Errors and solution:
 
 My first approach was to exopse the application via an API gateway. I used `LAMBDA_PROXY` for the response handling. Hence I ended up with CORS when I hit the endpoint with the local dev server.
 
 **Solution**: Hence, for doing so, you have to add the valid response headers in the response returned by the lambda itself. It can be done the following way:
```python
return {
  'statusCode': 200,
  'body': '<your-response>',
  'headers': {
      "access-control-allow-origin": "*",
      "cache-control": "no-cache",
      "content-type": "application/json; charset=utf-8",
      "vary": "Accept-Encoding"
  }
}
```
