const Joi = require('joi');

const logSchema = Joi.object({
  message: Joi.string().required(),
  level: Joi.string().valid('info', 'warn', 'error', 'success').required(),
  resourceId: Joi.string().required(),
  traceId: Joi.string().optional(),
  spanId: Joi.string().optional(),
  commit: Joi.string().optional(),
  metadata: Joi.object().optional(),
  timestamp: Joi.date().iso().optional(),
});

module.exports = { logSchema };
