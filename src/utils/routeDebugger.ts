import { Router } from 'express';

export class RouteDebugger {
  static logRoutes(router: Router, basePath: string = '') {
    console.log(`\n🔍 Registered routes for ${basePath}:`);
    
    const stack = router.stack;
    if (!stack) {
      console.log('No routes found');
      return;
    }

    stack.forEach((layer: any) => {
      if (layer.route) {
        const methods = Object.keys(layer.route.methods);
        const path = layer.route.path;
        methods.forEach((method: string) => {
          console.log(`  ${method.toUpperCase()} ${basePath}${path}`);
        });
      } else if (layer.name === 'router') {
        // This is a nested router
        console.log(`  └─ Nested router at ${layer.regexp}`);
      }
    });
  }

  static logAllRoutes(app: any) {
    console.log('\n🚀 All registered routes:');
    console.log('========================');
    
    app._router.stack.forEach((layer: any) => {
      if (layer.route) {
        const methods = Object.keys(layer.route.methods);
        const path = layer.route.path;
        methods.forEach((method: string) => {
          console.log(`${method.toUpperCase()} ${path}`);
        });
      } else if (layer.name === 'router') {
        console.log(`Router mounted at: ${layer.regexp}`);
        if (layer.handle && layer.handle.stack) {
          layer.handle.stack.forEach((nestedLayer: any) => {
            if (nestedLayer.route) {
              const methods = Object.keys(nestedLayer.route.methods);
              const path = nestedLayer.route.path;
              methods.forEach((method: string) => {
                console.log(`  ${method.toUpperCase()} ${path}`);
              });
            }
          });
        }
      }
    });
  }
} 