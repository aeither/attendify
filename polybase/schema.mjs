export const POLYBASE_SCHEMA = `
@public
collection User {
  id: string;
  publicKey: PublicKey;
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

  function setPoints (points: number) {
    if (ctx.publicKey != '0x000000000') {
      error('You are not allowed to update the points.');
    }
    this.points = points;
  }
  
  del(){
    // if (ctx.publicKey.toHex() != this.publicKey) {
    //   error('You are not the owner');
    // }
    selfdestruct();
  }

  @index(id);
}

@public
collection Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  owner: string;
  participants: string[];

  constructor (id: string, title: string, description: string, date: string, location: string, owner: string, participant: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.location = location;
    this.owner = owner;
    this.participants = [participant];
  }
}

@public
collection Ticket {
  id: string;
  type: string;
  price: number;
  quantity: number;
  eventTitle: string;
  eventId: string;
  userId: string;

  constructor (id: string, type: string, price: number, quantity: number, eventTitle: string, eventId: string, userId: string) {
    this.id = id;
    this.type = type;
    this.price = price;
    this.quantity = quantity;
    this.eventTitle = eventTitle;
    this.eventId = eventId;
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
