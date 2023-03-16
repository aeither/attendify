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
    
      @index(id);
    }
    
    @public
    collection Event {
      id: string;
      description: string;
      date: number;
      location: string;
      participants: string[];
    
      constructor () {
     
      }
    }    
`