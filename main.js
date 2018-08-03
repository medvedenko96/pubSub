const MyEventEmitter = {

  channels : {},

  subscribe (channelName, listener) {      // підписатися
    if (!this.channels[channelName]) {
      this.channels[channelName] = []
    }
    this.channels[channelName].push(listener)
  },

  publish (channelName, data) {             // опублікувати
    const channel = this.channels[channelName];
    if (!channel || !channel.length) {
      return
    }

    channel.forEach(listener => listener(data))
  }
};
//------------------------------------------------------------
class Order {
  constructor (params) {
    this.params = params
  }

  save () {
    console.log('Order saved');
    MyEventEmitter.publish('order/new', {
      userEmail: this.params.userEmail
    })
  }
}

class Mailer {
  constructor () {
    MyEventEmitter.subscribe('order/new', this.sendPurchaseEmail)
  }

  sendPurchaseEmail (params) {
    console.log(`Email send to ${params.userEmail}`)
  }
}

const mailer = new Mailer();
const order = new Order({userEmail: 'john@gmail.com'})
order.save();

//---------------------------------

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  emit(type, arg) {
    if (this.events[type]) {
      this.events[type].forEach(listener => listener(arg));
    }
  }
}