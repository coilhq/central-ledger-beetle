/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 * Coil
 *  - Jason Bruwer <jason.bruwer@coil.com>
 --------------
 ******/
'use strict'

const Handler = require('./handler')
const Joi = require('joi')
const tags = ['api', 'jmeter']

const nameValidator = Joi.string().alphanum().min(2).max(30).required().description('Name of the participant')

module.exports = [
  {
    method: 'GET',
    path: '/jmeter/transactions/ilp/{id}',
    handler: Handler.getIlpTransactionById,
    options: {
      tags,
      description: 'jMeter API used for retrieving a ILP transaction by id.',
      validate: {
        params: Joi.object({
          id: Joi.string().required().description('Transaction id')
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/jmeter/participants/{name}/transfers/{id}',
    handler: Handler.getTransferById,
    options: {
      tags,
      description: 'jMeter API used for retrieving a MJL transaction by id.',
      validate: {
        params: Joi.object({
          name: nameValidator,
          id: Joi.string().required().description('Transfer id')
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/jmeter/transfers/prepare',
    handler: Handler.prepareTransfer,
    options: {
      tags,
      payload: {
        allow: ['application/json'],
        failAction: 'error'
      },
      validate: {
        payload: Joi.object({
          fulfil: Joi.boolean().required().description('Should the fulfil operation also be performed.'),
          transferId: Joi.string().required()
        }),
      }
    }
  }
]