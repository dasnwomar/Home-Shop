document.querySelector('.container').addEventListener('click', function(event) {
    const product = event.target.closest('.product');
    const closeButton = event.target.closest('.close-btn');

    if (closeButton) {
        const moreInfo = closeButton.closest('.more-info');
        if (moreInfo) {
            moreInfo.style.display = 'none';
        }
    } else if (product) {
        const moreInfo = product.querySelector('.more-info');
        if (moreInfo) {
            document.querySelectorAll('.more-info').forEach(info => info.style.display = 'none');
            moreInfo.style.display = moreInfo.style.display === 'flex' ? 'none' : 'flex';
        }
    }
});



// search part




// Synonym dictionary
const synonyms = {
    'abuuwalad': ['buskud', 'biscuit', 'cookie'],
    '6kun': ['price', 'cost', '6k']
};

// Get elements
const searchBox = document.getElementById('searchBox');
const products = document.querySelectorAll('.product');

// Search function
searchBox.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    products.forEach(product => {
        const productName = product.querySelector('.p-dtail h4').textContent.toLowerCase();
        const productPrice = product.querySelector('.p-dtail h3').textContent.toLowerCase();

        // Check direct match
        let isMatch = productName.includes(query) || productPrice.includes(query);

        // Check synonym match
        if (!isMatch) {
            for (let [key, values] of Object.entries(synonyms)) {
                if (key.includes(query) || values.some(syn => syn.includes(query))) {
                    isMatch = productName.includes(key) || productPrice.includes(key);
                    break;
                }
            }
        }

        // Show/hide products
        product.style.display = isMatch ? 'block' : 'none';
    });
});
