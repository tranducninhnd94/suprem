const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        address: [
            {
                ward: {
                    type: String
                },
                district: {
                    type: String
                },
                province: {
                    type: String
                }
            }
        ],
        phone_number: [
            {
                type: String
            }
        ],
        fax: {
            type: String
        },
        owner: [
            {
                type: String
            }
        ],
        logo: {
            type: String
        },
        create_at: {
            type: Date,
        },
        update_at: {
            type: Date
        }
    }
)

module.exports = mongoose.model("store", StoreSchema);
