# Firebase chat SDK

Firebase chat ready-to-use SDK allows building fast connection to firestore database in order to create chat
application. Create chat rooms, send and read messages.

## Getting started

Before getting started you need to configure your application in Firebase console. Be sure to create a web app with
**Firestore** and **anonymous authentication** enabled.

Install package with command

```shell
$ npm i -S https://github.com/SergeyMell/firebase-chat-sdk
```

directly from the GitHub. It's not published for now since being actively developed.

Works with both CommonJS and ECMAScript modules

No ECMAScript

```javascript
const {
    initChatApp,
    connectUser,
    createChannel,
    addUserToChannel
} = require('@sergeymell/firebase-chat-sdk');
```

ECMAScript

```javascript
import {
    initChatApp,
    connectUser,
    createChannel,
    addUserToChannel
} from '@sergeymell/firebase-chat-sdk';
```

## Initialize the app

```javascript
initChatApp({
    // your firebase app config...
});
```

## Connect user to the application

You need a user in order to send a messages to a channel. You can use a unique ID that hasn't been taken by any of your
chat application users. In this case, a new user will be automatically created in your application before being
connected. Otherwise, the existing user instance will be used.

```javascript
const userId = 'some uniq user id';
const userName = 'Sergey Mell';
connectUser(userId, userName)
    .then((user) => {
        // User successfully authenticated and connected
    })
    .catch((err) => {
        // Error occured during user connection
    });
```

## Create channel

Channels are where all users in your chat application can easily participate without an invitation. The following codes
show how to create an open channel.

**Important note:** If you use the id of the existing channel it will be rewritten by the new data.

```javascript
const channelId = 'some uniq channel id';
createChannel(channelId, {
    title: 'Students Community',
    tags: ['school', 'group12'],
    payload: {
        teacher: 'John Doe',
        address: '',
        country: 'Ukraine'
    }
}).then((channel) => {
    // Chat successfully created
}).catch((err) => {
    // Error occured during chat creation
});
```

It is important to set `title` for the channel. You can add a list of `tags` that will allow to find this channel by any
of this tag. `payload` is an option JSON serializable structure that will be provided together with chat data and is
used to store some meta information which can be useful for some other purposes.

In order to get channel by id use `getChannel(<channel id here>)` function.

## Join channel

Once channel is created or fetched you can add user to it

```javascript
addUserToChannel(channelId, userId);
```

## Search for channels

SDK allows you to search channels by tags or user id.

```javascript
const channelsByTags = await findChannelsByTags(['school']);
const userChannels = await findChannelsByUser(userId, ['school']);
```

The response is paginated via cursor pagination

```javascript
userChannels.channels // list of the channels
userChannels.next // Cursor which allows you to request next batch of channels
const userChannelsResponse = await findChannelsByUser(userId, ['school']);
const listOfChannels = userChannelsResponse.channels;
const nextPageResponse = await findChannelsByUser(userId, ['school'], 10, userChannelsResponse.next);
```

## Work with messages

SDK allows sending and querying messages of the channel

```javascript
const message = {
    message: 'Greetings',
    payload: {
        link: 'https://google.com',
        title: 'Visit Google'
    }
};
await postMessage(channelId, userId, message);
```

The message object contains actual text message in `message` field. In addition, it contains an optional `payload` field
which is a key-value items metadata where you can store additional information.

Method `getMessages(channelId)` allows you get a list of messages ordered by creation timestamp in descending order.
Pagination works the same as search channels methods. 
