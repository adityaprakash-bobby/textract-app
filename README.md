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