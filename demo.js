const tableInfo = {
  tableHeader: ['Student Name', 'Age', 'Phone', 'Address'],
  tableContent: [
    {
      'Student Name': 'John',
      Age: 19,
      Phone: '455 - 983 - 0903',
      Address: '123 Ave, San Francisco, CA, 94011',
    },
    {
      'Student Name': 'Alex',
      Age: 21,
      Phone: '455 - 983 - 0912',
      Address: '456 Rd, San Francisco, CA, 94012',
    },
    {
      'Student Name': 'Josh',
      Age: 22,
      Phone: '455 - 345 - 0912',
      Address: '789 Dr, Newark, CA, 94016',
    },
    {
      'Student Name': 'Matt',
      Age: 23,
      Phone: '321 - 345 - 0912',
      Address: '223 Dr, Sunnyvale, CA, 94016',
    },
  ],
};

const list = ['HTML', 'JavaScript', 'CSS', 'React', 'Redux', 'Java'];

const dropDownList = [
  { value: 'newark', content: 'Newark' },
  { value: 'santaClara', content: 'Santa Clara' },
  { value: 'unionCity', content: 'Union City' },
  { value: 'albany', content: 'Albany' },
  { value: 'dalyCity', content: 'Daly City' },
  { value: 'sanJose', content: 'San Jose' },
];

//generate the table header
const generateTableHeaderHelper = (tableHeader) => {
  const tableRowContainer = document.createElement('tr');
  const tableHeaderNodeArray = tableHeader.map((headTextContent) => {
    const tableHeaderElement = document.createElement('th');
    tableHeaderElement.textContent = headTextContent;
    return tableHeaderElement;
  });
  tableRowContainer.append(...tableHeaderNodeArray);
  return tableRowContainer;
};

//generate the table content
const generateTableContentHelper = (tableContent) => {
  const tableContentNodeArray = tableContent.map((tableRowContent) => {
    const tableRowContainer = document.createElement('tr');
    const tableRowNodeArray = Object.values(tableRowContent).map(
      (tableData) => {
        const tableDateNode = document.createElement('td');
        tableDateNode.textContent = tableData;
        return tableDateNode;
      }
    );
    tableRowContainer.append(...tableRowNodeArray);
    return tableRowContainer;
  });
  return tableContentNodeArray;
};

const generateTable = ({ tableHeader, tableContent }) => {
  const table = document.createElement('table');
  table.id = 'stu-info-table';
  const tableHeaderSection = generateTableHeaderHelper(tableHeader);
  const tableBodySection = generateTableContentHelper(tableContent);
  table.append(tableHeaderSection, ...tableBodySection);
  return table;
};

const generateListByType = (type, data) => {
  if (type !== 'ol' && type !== 'ul') {
    return;
  }

  const list = document.createElement(type);
  const listItemNodeArray = data.map((listData) => {
    const listItem = document.createElement('li');
    listItem.textContent = listData;
    return listItem;
  });
  list.append(...listItemNodeArray);
  return list;
};

const generateDropDownList = (data) => {
  const dropDownListContainer = document.createElement('select');
  const dropDownListNodeArray = data.map(({ value, content }) => {
    const dropDownListOption = document.createElement('option');
    dropDownListOption.textContent = content;
    dropDownListOption.value = value;
    return dropDownListOption;
  });

  dropDownListContainer.append(...dropDownListNodeArray);
  dropDownListContainer.onchange = (e) => {
    console.log(e.target.value);
  };

  return dropDownListContainer;
};

document.querySelector('#q1-table').append(generateTable(tableInfo));
document.querySelector('#q2').append(generateListByType('ol', list));
document.querySelector('#q2').append(generateListByType('ul', list));
document.querySelector('#q3').append(generateDropDownList(dropDownList));

const addContentBtn = document.querySelector('#add-content-btn');
const form = document.querySelector('#q1-form');
addContentBtn.onclick = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const valuesInForm = [...form.elements]
    .filter((ele) => ele.tagName === 'INPUT')
    .map((ele) => ele.value);
  //will construct the new object
  const newDataObject = {};
  tableInfo.tableHeader.forEach((header, index) => {
    newDataObject[header] = valuesInForm[index];
  });

  //add the new row into the bottom of the table
  const table = document.querySelector('#stu-info-table');
  //leverage generateTableContentHelper
  table.append(...generateTableContentHelper([newDataObject]));
  form.reset();
};
