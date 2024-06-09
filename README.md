This is an open source web application build to classify Emails based on subject and body and put a label on it , the techstack used is everything new in Next.js 14. It is bootstrapped with create-next-app@latest

![title](https://github.com/aa5hi5h/Sync-Mail/assets/156516764/fca861d0-5451-4c69-b9e4-58bbe55332d8)


## Getting Started

1) At First when the user will login, he will have this interface

  ![homepage](https://github.com/aa5hi5h/Sync-Mail/assets/156516764/aa5aafaa-3cee-4868-a6e5-421acaa75484)

2) By clicking in the input box user will have the choice of selecting how many email they want to retrieve

  ![input](https://github.com/aa5hi5h/Sync-Mail/assets/156516764/5748d87b-c6e3-4510-8d41-cf1e4b41fe1e)

```bash

//Getting emails

```

3) After which Email will be shown to the users which come directly from the gmail account which user have used to logged in 
   
  ![getMails](https://github.com/aa5hi5h/Sync-Mail/assets/156516764/117b9cb9-b3d3-4460-b890-d4de55731e84)

  ![example2](https://github.com/aa5hi5h/Sync-Mail/assets/156516764/8099bd48-2778-4c04-98eb-53589b026379)
  
  ![example](https://github.com/aa5hi5h/Sync-Mail/assets/156516764/8eab0606-cf36-4cc2-9509-0b5560cff907)

```bash

//classifying/labeling emials

```

4) now these Emails can be classified using OpenAi/Gemini LLM models into different categories like Important,Marketing,Spam,Promotional.., which will be shown as labeled below
   
  ![classifiedexample](https://github.com/aa5hi5h/Sync-Mail/assets/156516764/28eb0894-abdd-4e52-9104-3c58fb3b82e0)
  
  ![classifiedExaple2](https://github.com/aa5hi5h/Sync-Mail/assets/156516764/025ed8f6-be14-41d0-9564-d9a331c40c18)

  ![classifiedExample3](https://github.com/aa5hi5h/Sync-Mail/assets/156516764/edea7342-abf9-4b7f-bf89-8b391ed23729)

```bash

//preview of the mail

```

5) Clicking on the email also give you a preview of the email that will contain a other parts such as subject , body
   
  ![sheet2](https://github.com/aa5hi5h/Sync-Mail/assets/156516764/5afee405-fab0-4108-9b68-38e5d6a43afe)

  ![sheet](https://github.com/aa5hi5h/Sync-Mail/assets/156516764/833715fb-f78a-469f-af0d-f55116241705)

  ![sheet3](https://github.com/aa5hi5h/Sync-Mail/assets/156516764/f253bef3-c75e-4a83-8f03-c7e94a54b18c)

## Error Validation

6) Error handling has been properly setup in this app
   Examples- the default Gemini api key which I have used have a limit therefore it sometime give this error -
   
   ![apiEroror](https://github.com/aa5hi5h/Sync-Mail/assets/156516764/f771447e-4cb8-48c1-aa11-77b049df0ce7)
   
   one way to resolve this is by adding your own api key (if you have one )
   
   ![key](https://github.com/aa5hi5h/Sync-Mail/assets/156516764/224dd9a6-d47d-4179-abde-fd1d69369407)



