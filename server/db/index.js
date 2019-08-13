import { connect, connection } from 'mongoose';
import getSecret from '../secrets';

connect( getSecret('dbUri'), { useNewUrlParser: true })
    .then(() => {
        console.log('Connection success')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = connection

export default db