import {sha512} from 'js-sha512';

class HashGenerator{
    static getHash(props) {
        const hashString = props.key|props.txnId|props.amount|props.productName|props.firstName|props.email|props.udf1|props.udf2|props.udf3|props.udf4|props.udf5|props.udf6|props.udf7|props.udf8|props.udf9|props.udf10|props.salt;
        return sha512(hashString);
    }
}

export default HashGenerator;