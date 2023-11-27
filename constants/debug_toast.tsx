export const toast = (msg: string) => {
    const toast = document.createElement('div');
    toast.classList.add(
        'fixed',
        'bottom-0',
        'left-1/2',
        'transform',
        '-translate-x-1/2',
        'px-3',
        'py-2',
        'rounded-t-md',
        'text-white',
        'bg-gray-900',
        'shadow-lg',
        'z-50',
        'transition-opacity',
        'duration-300',
        'opacity-0',
        'pointer-events-none',
        'select-none'
    );
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('opacity-100');
    }, 100);
    setTimeout(() => {
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0');
    }, 2000);
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 2300);
};