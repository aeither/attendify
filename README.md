
## Attendify

<a href="url"><img src="https://user-images.githubusercontent.com/36173828/227645598-23ecdd38-b7c4-4854-be92-3acc932c9862.png" align="center" width="480" ></a>

The Gateway to Trusted Event Communities.

### Demo

https://user-images.githubusercontent.com/36173828/227645313-9af4638a-77b0-4eb0-8a54-a613f2903fa9.mov

Full demo video: https://youtu.be/idtGHwdm1fQ

App: https://attendify.vercel.app/

### Description

The Attendify app provides a solution to the challenge of knowing which events are worth attending and the quality of people who will be attending. By serving as the gateway to trusted event communities, Attendify helps to establish trust and accountability through its attestation process. Attendees can be assured that the events they are attending meet certain standards and that the other attendees have been vetted. This helps to create a more transparent and inclusive event experience, where everyone is held to the same standards and has access to the same information. With Attendify, attendees can feel confident that they are participating in high-quality events and connecting with like-minded individuals.

### Tech Stack

Frontend: Typescript, React, NextJS, MUI, TailwindCSS

Packages: Polybase, ATST, Thirdweb, GraphQL

### How it's made

there are several challenges we confronted to make this app working. 

Auth

Implemented Polybase to enable attendees to login with email and buy tickets by signing a message, providing a fast and fee-less experience without requiring knowledge of the web3 stack.

Storage

Used Polybase to store user data, event, and ticket information while ensuring ownership of data by the user. Encrypted data using Polybase encryption utilities to maintain sensible privacy.

Check-in and attestation issuance

Leveraged Polybase encryption utilities to enable event organizers to verify that a ticket was issued for the event by the organizer.

Utilized Optimism AttestationStation Station to mint attestations for attendees who have attended the event.

List of attestatios

Combined Kevin Halliday's op attestations subgraph with GraphQL to fetch an array of all the attestations received and given to the user, allowing anyone to connect and check for a list of attestations to verify trustworthiness easily.

### Screenshots

![features](https://user-images.githubusercontent.com/36173828/227645621-0430c70a-b5b1-46a3-ba88-532205fddaff.png)

### Flow

![flow](https://user-images.githubusercontent.com/36173828/227645673-b2ec9dd2-9c5a-42da-9e71-cbde4323aa56.png)

