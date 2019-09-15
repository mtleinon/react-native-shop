import moment from 'moment';
class Order {
  constructor(id, items, amount, date) {
    this.id = id;
    this.items = items;
    this.amount = amount;
    this.date = date;
  };

  get readableDate() {
    // return this.date.toLocaleDateString('en-EN',
    //   {
    //     year: 'numeric',
    //     month: 'numeric',
    //     day: 'numeric',
    //     huor: '2-digit',
    //     minute: '2-digit'
    //   })
    return moment(this.date).format('MM/DD/YYYY, hh:mm');
  }
}
export default Order;