document.addEventListener('DOMContentLoaded', () => {
    const svgPaths = document.querySelectorAll('path, g'); // Select all paths and groups

    // Mapping between paths/groups and row numbers in the CSV file
    const pathDataMap = {
        'AR-A': { rowNumber: 1, imagePath: 'flags/AR-A.svg' },
        'AR-B': { rowNumber: 2, imagePath: 'flags/AR-B.svg' },
        'AR-C': { rowNumber: 3, imagePath: 'flags/AR-C.svg' },
        'AR-D': { rowNumber: 4, imagePath: 'flags/AR-D.svg' },
        'AR-E': { rowNumber: 5, imagePath: 'flags/AR-E.svg' },
        'AR-F': { rowNumber: 6, imagePath: 'flags/AR-F.svg' },
        'AR-G': { rowNumber: 7, imagePath: 'flags/AR-G.svg' },
        'AR-H': { rowNumber: 8, imagePath: 'flags/AR-H.svg' },
        'AR-J': { rowNumber: 9, imagePath: 'flags/AR-J.svg' },
        'AR-K': { rowNumber: 10, imagePath: 'flags/AR-K.svg' },
        'AR-L': { rowNumber: 11, imagePath: 'flags/AR-L.svg' },
        'AR-M': { rowNumber: 12, imagePath: 'flags/AR-M.svg' },
        'AR-N': { rowNumber: 13, imagePath: 'flags/AR-N.svg' },
        'AR-P': { rowNumber: 14, imagePath: 'flags/AR-P.svg' },
        'AR-Q': { rowNumber: 15, imagePath: 'flags/AR-Q.svg' },
        'AR-R': { rowNumber: 16, imagePath: 'flags/AR-R.svg' },
        'AR-S': { rowNumber: 17, imagePath: 'flags/AR-S.svg' },
        'AR-T': { rowNumber: 18, imagePath: 'flags/AR-T.svg' },
        'AR-U': { rowNumber: 19, imagePath: 'flags/AR-U.svg' },
        'AR-V': { rowNumber: 20, imagePath: 'flags/AR-V.svg' },
        'AR-W': { rowNumber: 21, imagePath: 'flags/AR-W.svg' },
        'AR-X': { rowNumber: 22, imagePath: 'flags/AR-X.svg' },
        'AR-Y': { rowNumber: 23, imagePath: 'flags/AR-Y.svg' },
        'AR-Z': { rowNumber: 24, imagePath: 'flags/AR-Z.svg' },
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