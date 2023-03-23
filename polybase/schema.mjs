export const POLYBASE_SCHEMA = `
@public
collection User {
  id: string;
  publicKey: PublicKey;
  encryptPubKey?: string;
  name?: string; 
  
  image?: string;
  level?: number;
  points?: number;

  constructor (id: string) {
    this.id = id;
    
    this.publicKey = ctx.publicKey;
    this.name = 'anonymous';
        this.points = 0;
  }

  function setName (name: string) {
    if (ctx.publicKey != this.publicKey) {
      error('You are not the creator of this record.');
    }
    this.name = name;
  }

  function setEncryptPubKey (encryptPubKey: string) {
    if (ctx.publicKey != this.publicKey) {
      error('You are not the creator of this record.');
    }
    this.encryptPubKey = encryptPubKey;
  }

  function setPoints (points: number) {
    if (this.publicKey != ctx.publicKey) {
       throw error('invalid user');
    }
    this.points = points;
  }
  
  del(){
    if (ctx.publicKey != this.publicKey) {
      error('You are not the owner');
    }
    selfdestruct();
  }

  @index(id);
}

@public
collection Event {  
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  encryptPubKey: string;
  owner: string;
  participants: string[];

  constructor (id: string, title: string, description: string, image: string, date: string, location: string, encryptPubKey: string, owner: string, participant: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.date = date;
    this.location = location;
    this.encryptPubKey = encryptPubKey;
    this.owner = owner;
    this.participants = [participant];
  }

  function joinEvent (participant: string) {
    this.participants.push(participant);
  }
}

@public
collection Ticket {
  id: string;
  encryptedData: string;
  type: string;
  price: number;
  quantity: number;
  eventTitle: string;
  eventId: string;
  image: string;
  userId: string;

  constructor (id: string, encryptedData: string, type: string, price: number, quantity: number, eventTitle: string, eventId: string, image: string, userId: string) {
    this.id = id;
    this.encryptedData = encryptedData;
    this.type = type;
    this.price = price;
    this.quantity = quantity;
    this.eventTitle = eventTitle;
    this.eventId = eventId;
    this.image = image;
    this.userId = userId;
  }
}

@public
collection Order {
  id: string;
  eventId: string;
  ticketId: string;
  userId: string;

  constructor (id: string, eventId: string, ticketId: string, userId: string) {
    this.id = id;
    this.eventId = eventId;
    this.ticketId = ticketId;
    this.userId = userId;
  }
}
`
