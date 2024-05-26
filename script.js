document.addEventListener('DOMContentLoaded', () => {
    const svgPaths = document.querySelectorAll('path, g'); // Select all paths and groups

    // Mapping between paths/groups and row numbers in the CSV file
    const pathDataMap = {
        'Salta': { rowNumber: 1, imagePath: 'flags/Salta.svg' },
        'BuenosAires': { rowNumber: 2, imagePath: 'flags/BuenosAires.svg' },
        'AMBA': { rowNumber: 3, imagePath: 'flags/AMBA.svg' },
        'SanLuis': { rowNumber: 4, imagePath: 'flags/SanLuis.svg' },
        'EntreRios': { rowNumber: 5, imagePath: 'flags/EntreRios.svg' },
        'LaRioja': { rowNumber: 6, imagePath: 'flags/LaRioja.svg' },
        'SantiagoDelEstero': { rowNumber: 7, imagePath: 'flags/SantiagoDelEstero.svg' },
        'Chaco': { rowNumber: 8, imagePath: 'flags/Chaco.svg' },
        'SanJuan': { rowNumber: 9, imagePath: 'flags/SanJuan.svg' },
        'Catamarca': { rowNumber: 10, imagePath: 'flags/Catamarca.svg' },
        'LaPampa': { rowNumber: 11, imagePath: 'flags/LaPampa.svg' },
        'Mendoza': { rowNumber: 12, imagePath: 'flags/Mendoza.svg' },
        'Misiones': { rowNumber: 13, imagePath: 'flags/Misiones.svg' },
        'Formosa': { rowNumber: 14, imagePath: 'flags/Formosa.svg' },
        'Neuquen': { rowNumber: 15, imagePath: 'flags/Neuquen.svg' },
        'RioNegro': { rowNumber: 16, imagePath: 'flags/RioNegro.svg' },
        'SantaFe': { rowNumber: 17, imagePath: 'flags/SantaFe.svg' },
        'Tucuman': { rowNumber: 18, imagePath: 'flags/Tucuman.svg' },
        'Chubut': { rowNumber: 19, imagePath: 'flags/Chubut.svg' },
        'TierraDelFuego': { rowNumber: 20, imagePath: 'flags/TierraDelFuego.svg' },
        'Corrientes': { rowNumber: 21, imagePath: 'flags/Corrientes.svg' },
        'Cordoba': { rowNumber: 22, imagePath: 'flags/Cordoba.svg' },
        'Jujuy': { rowNumber: 23, imagePath: 'flags/Jujuy.svg' },
        'SantaCruz': { rowNumber: 24, imagePath: 'flags/SantaCruz.svg' },
    };

    // Event listener for mouseenter event on SVG paths/groups
    svgPaths.forEach(path => {
        path.addEventListener('mouseenter', async (event) => {
            const pathId = path.id;
            let { rowNumber, imagePath } = pathDataMap[pathId] || { rowNumber: null, imagePath: null };

            if (rowNumber !== null) {
                try {
                    const csvData = await fetchDataFromCSV('data.csv'); // Fetch CSV data
                    const rowData = parseCSV(csvData, rowNumber); // Parse CSV data and extract row
                    renderList(rowData, imagePath); // Render list with extracted data and image
                } catch (error) {
                    console.error('Error fetching or parsing CSV data:', error);
                }
            }
        });
    });

    // Event listener for click event on SVG paths/groups
    svgPaths.forEach(path => {
        path.addEventListener('click', async (event) => {
            const pathId = path.id;
            let { rowNumber, imagePath } = pathDataMap[pathId] || { rowNumber: null, imagePath: null };

            if (rowNumber !== null) {
                try {
                    const csvData = await fetchDataFromCSV('data.csv'); // Fetch CSV data
                    const rowData = parseCSV(csvData, rowNumber); // Parse CSV data and extract row
                    renderList(rowData, imagePath); // Render list with extracted data and image
                } catch (error) {
                    console.error('Error fetching or parsing CSV data:', error);
                }
            }
            event.stopPropagation(); // Prevent the click event from propagating to parent elements
        });
    });

    // Event listener for mouseleave event on SVG paths/groups
    svgPaths.forEach(path => {
        path.addEventListener('mouseleave', () => {
            // Hide the list
            hideList();
        });
    });

    // Event listener for click event on the list to prevent hiding
    const list = document.getElementById('list');
    list.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click event from propagating to the document
    });

    // Event listener for click event on the document to hide the list
    document.addEventListener('click', () => {
        hideList();
    });

    // Function to fetch data from CSV file
    async function fetchDataFromCSV(fileName) {
        const response = await fetch(fileName); // Fetch CSV file
        return await response.text(); // Return CSV data as text
    }

    // Function to parse CSV data and extract row
    function parseCSV(csvData, rowNumber) {
        const rows = csvData.split('\n');
        const rowData = rows[rowNumber - 1].split(',').map(item => item.trim());
        return rowData;
    }

// Function to render the list with data and image
function renderList(data, imagePath) {
    const list = document.getElementById('list');
    list.innerHTML = ''; // Clear previous content

    // Create a div for the image and add it to the list
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    const image = document.createElement('img');
    image.src = imagePath; // Set the image source
    image.alt = 'Image'; // Set alternative text for accessibility
    imageContainer.appendChild(image);
    list.appendChild(imageContainer);

                // Apply CSS styling to scale down the size of the image
                image.style.width = '100px'; // Adjust the width as needed
                image.style.height = 'auto'; // Maintain aspect ratio

    // Create a div for the list items
    const listItemsContainer = document.createElement('div');
    listItemsContainer.classList.add('list-items-container');

    // Append the rest of the data to the list item div
    data.forEach((item, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');
        
        // Create a <span> element for the text content
        const span = document.createElement('span');
        span.textContent = item;
        if (index === 0) {
            span.classList.add('title');
        }
        // Append the span to the list item
        listItem.appendChild(span);
        
        // Append the list item to the list
        listItemsContainer.appendChild(listItem);
    });

    // Append the list items container to the list
    list.appendChild(listItemsContainer);
    list.style.display = 'block'; // Show the list
}
    // Function to hide the list
    function hideList() {
        const list = document.getElementById('list');
        list.style.display = 'none'; // Hide the list
    }
});