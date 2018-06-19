const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        gen: {

        },
        email: {
            type: String,
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
        username: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true,
            default: "abc13579"
        },
        fb_address: [
            {
                url: {
                    type: String
                }
            }
        ],
        phone_number: [
            {
                type: String
            }
        ],
        avatar: {
            type: String
        },
        roles: [
            {
                type: Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        latest_access: {
            type: Date
        },
        create_at: {
            type: Date
        },
        update_at: {
            type: Date
        }
    }
)

module.exports = mongoose.model("Empoloyee", EmployeeSchema);