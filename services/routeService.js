const path = require('path')
const fs = require('fs')

const sourceDir = './routes'

function exceptionCatcherWrapper(middleware) {

    return async (request, response, next) => {

        try {

            return await middleware(request, response, next);
        }
        catch (err) {

            if(process.env.NODE_ENV !== 'production') {

                console.error(err.stack);
            }

            // response.status(500).send({ message: err.message })
            next(err);
        }
    }
}

function wrapRouterWithExceptionCatcherWrapper(stack) {

    stack?.forEach((_stack => {

        if (_stack.handle) {

            _stack.handle = exceptionCatcherWrapper(_stack.handle)
        }

        wrapRouterWithExceptionCatcherWrapper(_stack.route?.stack)
    }))
}

module.exports = server => {

    function recurseIntoDir(dir) {

        const x = '.' + sourceDir

        fs.readdirSync(dir).forEach(item => {

            const p = path.join(dir, item);

            if (fs.lstatSync(p).isDirectory()) {

                return recurseIntoDir(p);
            }

            if (path.extname(p) === false) { return; }

            const fileName = '../' + p.replace(/\\/g, '/');

            let route = fileName.substring(x.length);

            route = route.substring(0, route.length - 3);

            if (route.includes('/z_')) {

                route = route.replace(/\/z_/g, '/')
            }

            if (route.endsWith('/index')) {

                route = route.substring(0, route.length - 6) || '/';
            }

            if(route == "/contacts"){
                route = '';
            }

            console.log(`${fileName} => ${route}`);

            const router = require(fileName)

            wrapRouterWithExceptionCatcherWrapper(router.stack)

            server.use(route, require(fileName));
        });
    }

    recurseIntoDir(sourceDir)

    server.use((err, request, response, next) => {

        const { message } = err

        if (!message) response.end()

        response.status(500).send({ message })
    })
}
