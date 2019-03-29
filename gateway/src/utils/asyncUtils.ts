export async function retry(callback, retries, debounce = 0) {
    let lastError;
    for (let i = 0; i < retries; i++) {
        try {
            return await callback();
        } catch (err) {
            lastError = err;
            if (debounce) {
                await wait(debounce);
            }
        }
    }
    return lastError;
}

export function wait(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}
