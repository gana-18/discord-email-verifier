const Email=require('../models/Email')

//find if the email present in req.query.email is in the database

const findEmail=async(req,res)=>{
    try {
        const email = req.query.email;
        const foundEmail = await Email.findOne({ email });

        if (foundEmail) {
            return res.status(200).json({ message: 'Email found in the database.' });
        } else {
            return res.status(404).json({ message: 'Email not found in the database.' });
        }
    } catch (error) {
        console.error('Error finding email:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }

}

module.exports={findEmail}