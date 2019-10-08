export const bindHelpers = (_module, helperModule) => {
    // Get the object properties
    const helperProps = Object.keys(helperModule);

    // Loop through the helperProps 
    helperProps.forEach((type) => {
        // Check if the type does not exist in the module
        if(!_module[type]) {
            _module[type] = helperModule[type];
            return;
        }

        // Log the keys for the type
        const funcs = Object.keys(helperModule[type]);
        
        // Loop through the keys
        funcs.forEach((currentFunc) => {
            _module[type][currentFunc] = helperModule[type][currentFunc];
        });
    });

    return _module;
};