const users = require('./routes/usersRouter');
const properties = require('./routes/propertiesRouter');
const tenantPreferences = require('./routes/tenantPreferencesRouter');
const bookings = require('./routes/bookingRouter');
const routes = (app) => {
    app.use('/api/users', users);
    app.use('/api/properties', properties);
    app.use('/api/tenant-preferences', tenantPreferences);
    app.use('/api/bookings', bookings);
};
module.exports = routes;