// Dados simulados para usuários (funcionários)
const users = [
  { username: 'Bernardo', password: '201988', name: 'Administrador' },
  { username: 'garcom1', password: 'abcd', name: 'Garçom 1' },
  { username: 'garcom2', password: 'abcd', name: 'Garçom 2' }
];

// Estado global
let currentUser = null;

// Produtos (inicialmente vazio, pode ser carregado do localStorage)
let products = JSON.parse(localStorage.getItem('products')) || [
  { id: '1', name: 'Cerveja Long Neck', category: 'Bebidas', price: 8.50, image: 'https://storage.googleapis.com/a1aa/image/5f9a5342-4cac-48ef-21ed-3d958c2fae43.jpg' },
  { id: '2', name: 'Refrigerante Lata', category: 'Bebidas', price: 5.00, image: 'https://storage.googleapis.com/a1aa/image/9e654d0f-8b3b-4211-573f-22d4bed3dbe8.jpg' },
  { id: '3', name: 'Suco Natural', category: 'Bebidas', price: 7.00, image: 'https://storage.googleapis.com/a1aa/image/660c70eb-5f6b-452c-a305-b31fc0bd577b.jpg' },
  { id: '4', name: 'Batata Frita', category: 'Entradas', price: 15.00, image: 'https://storage.googleapis.com/a1aa/image/30d51bb3-b9f4-4a30-9031-8d084cb38c4a.jpg' },
  { id: '5', name: 'Bolinho de Bacalhau', category: 'Entradas', price: 25.00, image: 'https://storage.googleapis.com/a1aa/image/0027e2e9-2fd3-4626-7e08-918d370506fb.jpg' },
  { id: '6', name: 'Coxinha', category: 'Entradas', price: 18.00, image: 'https://storage.googleapis.com/a1aa/image/054ccd59-8c19-49af-56e7-8561325dacc1.jpg' },
  { id: '7', name: 'Picanha Grelhada', category: 'Pratos Principais', price: 55.00, image: 'https://storage.googleapis.com/a1aa/image/4dcde55e-cde3-4e03-ef9b-735f42ef103a.jpg' },
  { id: '8', name: 'Filé de Frango', category: 'Pratos Principais', price: 40.00, image: 'https://storage.googleapis.com/a1aa/image/1859ebda-58c0-406c-ddfd-a0fdbec0b15c.jpg' },
  { id: '9', name: 'Lasanha à Bolonhesa', category: 'Pratos Principais', price: 38.00, image: 'https://storage.googleapis.com/a1aa/image/7c522a5b-f89d-4c83-9c90-7b57c15f77d5.jpg' },
  { id: '10', name: 'Pudim de Leite', category: 'Sobremesas', price: 12.00, image: 'https://storage.googleapis.com/a1aa/image/be629c64-7254-4d4f-0f1f-1c894d97eae8.jpg' },
  { id: '11', name: 'Sorvete', category: 'Sobremesas', price: 10.00, image: 'https://storage.googleapis.com/a1aa/image/228610cc-9c79-4951-ad31-180772e045b0.jpg' },
  { id: '12', name: 'Mousse de Maracujá', category: 'Sobremesas', price: 14.00, image: 'https://storage.googleapis.com/a1aa/image/54c3de44-37fc-4ca9-3df2-400fb240b73b.jpg' }
];

// Clientes (inicialmente vazio, pode ser carregado do localStorage)
let clients = JSON.parse(localStorage.getItem('clients')) || [];

// Comandas ativas
let activeOrders = [];

// Comandas finalizadas para relatório
let finalizedOrders = JSON.parse(localStorage.getItem('finalizedOrders')) || [];

// Estado da comanda ativa (no formulário)
let currentOrder = {
  tableNumber: null,
  clientId: null,
  items: [],
  paymentMethod: null,
};

// Elementos
const modalLogin = document.getElementById('modal-login');
const loginForm = document.getElementById('login-form');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');

const mainContent = document.getElementById('main-content');

const menuSection = document.getElementById('menu-section');
const orderSection = document.getElementById('order-section');
const productsSection = document.getElementById('products-section');
const clientsSection = document.getElementById('clients-section');
const activeOrdersSection = document.getElementById('active-orders-section');

const btnNewOrder = document.getElementById('btn-new-order');
const btnOrders = document.getElementById('btn-orders');
const btnMenu = document.getElementById('btn-menu');
const btnProducts = document.getElementById('btn-products');
const btnClients = document.getElementById('btn-clients');
const btnReports = document.getElementById('btn-reports');
const btnLogout = document.getElementById('btn-logout');

const btnNewOrderMobile = document.getElementById('btn-new-order-mobile');
const btnOrdersMobile = document.getElementById('btn-orders-mobile');
const btnMenuMobileBtn = document.getElementById('btn-menu-mobile-btn');
const btnProductsMobile = document.getElementById('btn-products-mobile');
const btnClientsMobile = document.getElementById('btn-clients-mobile');
const btnReportsMobile = document.getElementById('btn-reports-mobile');
const btnLogoutMobile = document.getElementById('btn-logout-mobile');

const btnMenuMobile = document.getElementById('btn-menu-mobile');
const mobileMenu = document.getElementById('mobile-menu');

// Order form elements
const orderItemsTbody = document.getElementById('order-items');
const orderTotalEl = document.getElementById('order-total');
const btnSubmitOrder = document.getElementById('btn-submit-order');
const btnClearOrder = document.getElementById('btn-clear-order');
const inputTableNumber = document.getElementById('table-number');
const selectClient = document.getElementById('client-select');
const selectPaymentMethod = document.getElementById('payment-method');

// Products section elements
const productsTableBody = document.getElementById('products-table-body');
const btnAddProduct = document.getElementById('btn-add-product');
const modalProduct = document.getElementById('modal-product');
const modalProductTitle = document.getElementById('modal-product-title');
const productForm = document.getElementById('product-form');
const inputProductName = document.getElementById('product-name');
const inputProductCategory = document.getElementById('product-category');
const inputProductPrice = document.getElementById('product-price');
const inputProductImage = document.getElementById('product-image');
const btnCancelProduct = document.getElementById('btn-cancel-product');

// Clients section elements
const clientsTableBody = document.getElementById('clients-table-body');
const btnAddClient = document.getElementById('btn-add-client');
const modalClient = document.getElementById('modal-client');
const modalClientTitle = document.getElementById('modal-client-title');
const clientForm = document.getElementById('client-form');
const inputClientName = document.getElementById('client-name');
const inputClientPhone = document.getElementById('client-phone');
const inputClientEmail = document.getElementById('client-email');
const btnCancelClient = document.getElementById('btn-cancel-client');

// Active orders section elements
const activeOrdersTableBody = document.getElementById('active-orders-table-body');

// Modal confirm elements
const modalConfirm = document.getElementById('modal-confirm');
const btnCancelModal = document.getElementById('btn-cancel-modal');
const btnConfirmModal = document.getElementById('btn-confirm-modal');

// Modal report elements
const modalReport = document.getElementById('modal-report');
const reportContent = document.getElementById('report-content');
const btnCloseReport = document.getElementById('btn-close-report');

// Modal invoice elements
const modalInvoice = document.getElementById('modal-invoice');
const invoiceContent = document.getElementById('invoice-content');
const btnCloseInvoice = document.getElementById('btn-close-invoice');
const btnPrintInvoice = document.getElementById('btn-print-invoice');

// State for product editing
let editingProductId = null;

// State for client editing
let editingClientId = null;

// State for order being finalized (for modal confirm)
let orderToFinalize = null;

// State for active order editing (in active orders list)
let editingActiveOrderId = null;

// Show/hide mobile menu
btnMenuMobile.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Navigation handlers
function hideAllSections() {
  menuSection.classList.add('hidden');
  orderSection.classList.add('hidden');
  productsSection.classList.add('hidden');
  clientsSection.classList.add('hidden');
  activeOrdersSection.classList.add('hidden');
}

function showSection(section) {
  hideAllSections();
  if (section === 'menu') {
    menuSection.classList.remove('hidden');
    orderSection.classList.remove('hidden');
  } else if (section === 'orders') {
    activeOrdersSection.classList.remove('hidden');
  } else if (section === 'new-order') {
    menuSection.classList.remove('hidden');
    orderSection.classList.remove('hidden');
    clearOrder();
  } else if (section === 'products') {
    productsSection.classList.remove('hidden');
    renderProductsTable();
  } else if (section === 'clients') {
    clientsSection.classList.remove('hidden');
    renderClientsTable();
  } else if (section === 'reports') {
    openReportModal();
  }
  mobileMenu.classList.add('hidden');
}

btnNewOrder.addEventListener('click', () => showSection('new-order'));
btnOrders.addEventListener('click', () => showSection('orders'));
btnMenu.addEventListener('click', () => showSection('menu'));
btnProducts.addEventListener('click', () => showSection('products'));
btnClients.addEventListener('click', () => showSection('clients'));
btnReports.addEventListener('click', () => showSection('reports'));
btnLogout.addEventListener('click', logout);

btnNewOrderMobile.addEventListener('click', () => showSection('new-order'));
btnOrdersMobile.addEventListener('click', () => showSection('orders'));
btnMenuMobileBtn.addEventListener('click', () => showSection('menu'));
btnProductsMobile.addEventListener('click', () => showSection('products'));
btnClientsMobile.addEventListener('click', () => showSection('clients'));
btnReportsMobile.addEventListener('click', () => showSection('reports'));
btnLogoutMobile.addEventListener('click', logout);

// Login form submit
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    currentUser = user;
    logAction(`Login efetuado pelo usuário: ${user.username}`);
    modalLogin.style.display = 'none';
    mainContent.classList.remove('hidden');
    showSection('new-order');
    loginForm.reset();
  } else {
    alert('Usuário ou senha inválidos.');
  }
});

// Logout
function logout() {
  if (confirm('Deseja realmente sair do sistema?')) {
    logAction(`Logout efetuado pelo usuário: ${currentUser.username}`);
    currentUser = null;
    mainContent.classList.add('hidden');
    modalLogin.style.display = 'flex';
    clearOrder();
  }
}

// Log de ações (simples console + localStorage)
function logAction(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${currentUser ? currentUser.username : 'N/A'}] ${message}`;
  console.log(logEntry);
  let logs = JSON.parse(localStorage.getItem('logs')) || [];
  logs.push(logEntry);
  localStorage.setItem('logs', JSON.stringify(logs));
}

// Render menu list grouped by category
function renderMenu() {
  const menuList = document.getElementById('menu-list');
  menuList.innerHTML = '';
  // Group products by category
  const categories = [...new Set(products.map(p => p.category))];
  categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('mb-6');
    const h3 = document.createElement('h3');
    h3.className = 'text-lg font-semibold text-gray-800 border-b border-indigo-300 pb-1 mb-2';
    h3.textContent = category;
    categoryDiv.appendChild(h3);

    const ul = document.createElement('ul');
    ul.className = 'space-y-2';

    products.filter(p => p.category === category).forEach(product => {
      const li = document.createElement('li');
      li.className = 'flex justify-between items-center border border-gray-200 rounded p-2 hover:bg-indigo-50 cursor-pointer group';
      li.setAttribute('tabindex', '0');
      li.setAttribute('role', 'button');
      li.setAttribute('aria-label', `Adicionar ${product.name} ao pedido`);
      li.dataset.id = product.id;

      li.innerHTML = `
        <div class="flex items-center gap-3">
          <img src="${product.image || 'https://placehold.co/64x64?text=Sem+Imagem'}" alt="Imagem do produto ${product.name}" class="w-16 h-16 rounded object-cover" width="64" height="64" />
          <div>
            <p class="font-semibold text-gray-900">${product.name}</p>
            <p class="text-sm text-gray-600">${product.category}</p>
          </div>
        </div>
        <div class="text-indigo-700 font-semibold group-hover:text-indigo-900">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
      `;

      li.addEventListener('click', () => {
        addItemToOrder(product);
      });
      li.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          addItemToOrder(product);
        }
      });

      ul.appendChild(li);
    });

    categoryDiv.appendChild(ul);
    menuList.appendChild(categoryDiv);
  });
}

// Render clients select options
function renderClientSelect() {
  selectClient.innerHTML = '<option value="">Selecione</option>';
  clients.forEach(client => {
    const option = document.createElement('option');
    option.value = client.id;
    option.textContent = client.name;
    selectClient.appendChild(option);
  });
}

// Render clients table
function renderClientsTable() {
  clientsTableBody.innerHTML = '';
  if (clients.length === 0) {
    const tr = document.createElement('tr');
    tr.classList.add('text-center', 'text-gray-500');
    tr.innerHTML = '<td colspan="4" class="py-4">Nenhum cliente cadastrado.</td>';
    clientsTableBody.appendChild(tr);
    return;
  }
  clients.forEach(client => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="py-2 px-3 border-r border-indigo-300">${client.name}</td>
      <td class="py-2 px-3 border-r border-indigo-300">${client.phone || ''}</td>
      <td class="py-2 px-3 border-r border-indigo-300">${client.email || ''}</td>
      <td class="py-2 px-3 flex justify-center gap-2">
        <button class="text-indigo-600 hover:text-indigo-800 focus:outline-none" aria-label="Editar cliente ${client.name}" data-action="edit"><i class="fas fa-edit"></i></button>
        <button class="text-red-600 hover:text-red-800 focus:outline-none" aria-label="Excluir cliente ${client.name}" data-action="delete"><i class="fas fa-trash-alt"></i></button>
      </td>
    `;
    const btnEdit = tr.querySelector('button[data-action="edit"]');
    const btnDelete = tr.querySelector('button[data-action="delete"]');

    btnEdit.addEventListener('click', () => {
      editingClientId = client.id;
      modalClientTitle.textContent = 'Editar Cliente';
      inputClientName.value = client.name;
      inputClientPhone.value = client.phone || '';
      inputClientEmail.value = client.email || '';
      modalClient.classList.remove('hidden');
      inputClientName.focus();
    });

    btnDelete.addEventListener('click', () => {
      if (confirm(`Deseja realmente excluir o cliente ${client.name}?`)) {
        clients = clients.filter(c => c.id !== client.id);
        localStorage.setItem('clients', JSON.stringify(clients));
        renderClientsTable();
        renderClientSelect();
        logAction(`Cliente excluído: ${client.name}`);
      }
    });

    clientsTableBody.appendChild(tr);
  });
}

// Render products table
function renderProductsTable() {
  productsTableBody.innerHTML = '';
  if (products.length === 0) {
    const tr = document.createElement('tr');
    tr.classList.add('text-center', 'text-gray-500');
    tr.innerHTML = '<td colspan="5" class="py-4">Nenhum produto cadastrado.</td>';
    productsTableBody.appendChild(tr);
    return;
  }
  products.forEach(product => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="py-2 px-3 border-r border-indigo-300">${product.name}</td>
      <td class="py-2 px-3 border-r border-indigo-300">${product.category}</td>
      <td class="py-2 px-3 border-r border-indigo-300">R$ ${product.price.toFixed(2).replace('.', ',')}</td>
      <td class="py-2 px-3 border-r border-indigo-300">
        <img src="${product.image || 'https://placehold.co/64x64?text=Sem+Imagem'}" alt="Imagem do produto ${product.name}" class="w-12 h-12 rounded object-cover" width="48" height="48" />
      </td>
      <td class="py-2 px-3 flex justify-center gap-2">
        <button class="text-indigo-600 hover:text-indigo-800 focus:outline-none" aria-label="Editar produto ${product.name}" data-action="edit"><i class="fas fa-edit"></i></button>
        <button class="text-red-600 hover:text-red-800 focus:outline-none" aria-label="Excluir produto ${product.name}" data-action="delete"><i class="fas fa-trash-alt"></i></button>
      </td>
    `;
    const btnEdit = tr.querySelector('button[data-action="edit"]');
    const btnDelete = tr.querySelector('button[data-action="delete"]');

    btnEdit.addEventListener('click', () => {
      editingProductId = product.id;
      modalProductTitle.textContent = 'Editar Produto';
      inputProductName.value = product.name;
      inputProductCategory.value = product.category;
      inputProductPrice.value = product.price;
      inputProductImage.value = product.image || '';
      modalProduct.classList.remove('hidden');
      inputProductName.focus();
    });

    btnDelete.addEventListener('click', () => {
      if (confirm(`Deseja realmente excluir o produto ${product.name}?`)) {
        products = products.filter(p => p.id !== product.id);
        localStorage.setItem('products', JSON.stringify(products));
        renderProductsTable();
        renderMenu();
        logAction(`Produto excluído: ${product.name}`);
      }
    });

    productsTableBody.appendChild(tr);
  });
}

// Add product button click
btnAddProduct.addEventListener('click', () => {
  editingProductId = null;
  modalProductTitle.textContent = 'Novo Produto';
  productForm.reset();
  modalProduct.classList.remove('hidden');
  inputProductName.focus();
});

// Cancel product modal
btnCancelProduct.addEventListener('click', () => {
  modalProduct.classList.add('hidden');
});

// Save product form submit
productForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = inputProductName.value.trim();
  const category = inputProductCategory.value.trim();
  const price = parseFloat(inputProductPrice.value);
  const image = inputProductImage.value.trim();

  if (!name || !category || isNaN(price) || price < 0) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  if (editingProductId) {
    // Edit existing product
    const product = products.find(p => p.id === editingProductId);
    if (product) {
      product.name = name;
      product.category = category;
      product.price = price;
      product.image = image;
      logAction(`Produto editado: ${name}`);
    }
  } else {
    // Add new product
    const newProduct = {
      id: Date.now().toString(),
      name,
      category,
      price,
      image,
    };
    products.push(newProduct);
    logAction(`Produto adicionado: ${name}`);
  }

  localStorage.setItem('products', JSON.stringify(products));
  renderProductsTable();
  renderMenu();
  modalProduct.classList.add('hidden');
});

// Add client button click
btnAddClient.addEventListener('click', () => {
  editingClientId = null;
  modalClientTitle.textContent = 'Novo Cliente';
  clientForm.reset();
  modalClient.classList.remove('hidden');
  inputClientName.focus();
});

// Cancel client modal
btnCancelClient.addEventListener('click', () => {
  modalClient.classList.add('hidden');
});

// Save client form submit
clientForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = inputClientName.value.trim();
  const phone = inputClientPhone.value.trim();
  const email = inputClientEmail.value.trim();

  if (!name) {
    alert('Por favor, preencha o nome do cliente.');
    return;
  }

  if (editingClientId) {
    // Edit existing client
    const client = clients.find(c => c.id === editingClientId);
    if (client) {
      client.name = name;
      client.phone = phone;
      client.email = email;
      logAction(`Cliente editado: ${name}`);
    }
  } else {
    // Add new client
    const newClient = {
      id: Date.now().toString(),
      name,
      phone,
      email,
    };
    clients.push(newClient);
    logAction(`Cliente adicionado: ${name}`);
  }

  localStorage.setItem('clients', JSON.stringify(clients));
  renderClientsTable();
  renderClientSelect();
  modalClient.classList.add('hidden');
});

// Utility functions to get client by id and name
function getClientById(id) {
  return clients.find(c => c.id === id);
}

function getClientNameById(id) {
  const client = getClientById(id);
  return client ? client.name : null;
}

// Save active orders to localStorage
function saveActiveOrders() {
  localStorage.setItem('activeOrders', JSON.stringify(activeOrders));
}

// Load active orders from localStorage
function loadActiveOrders() {
  activeOrders = JSON.parse(localStorage.getItem('activeOrders')) || [];
}

// Render active orders table
function renderActiveOrdersTable() {
  activeOrdersTableBody.innerHTML = '';
  if (activeOrders.length === 0) {
    const tr = document.createElement('tr');
    tr.classList.add('text-center', 'text-gray-500');
    tr.innerHTML = '<td colspan="5" class="py-4">Nenhuma comanda ativa.</td>';
    activeOrdersTableBody.appendChild(tr);
    return;
  }
  activeOrders.forEach(order => {
    const tr = document.createElement('tr');
    const total = order.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    tr.innerHTML = `
      <td class="py-2 px-3 border-r border-indigo-300">${order.tableNumber}</td>
      <td class="py-2 px-3 border-r border-indigo-300">${getClientNameById(order.clientId) || 'Nenhum'}</td>
      <td class="py-2 px-3 border-r border-indigo-300">${order.items.length}</td>
      <td class="py-2 px-3 border-r border-indigo-300">R$ ${total.toFixed(2).replace('.', ',')}</td>
      <td class="py-2 px-3 flex justify-center gap-2">
        <button class="text-indigo-600 hover:text-indigo-800 focus:outline-none" aria-label="Editar comanda da mesa ${order.tableNumber}" data-action="edit"><i class="fas fa-edit"></i></button>
        <button class="text-red-600 hover:text-red-800 focus:outline-none" aria-label="Excluir comanda da mesa ${order.tableNumber}" data-action="delete"><i class="fas fa-trash-alt"></i></button>
      </td>
    `;
    const btnEdit = tr.querySelector('button[data-action="edit"]');
    const btnDelete = tr.querySelector('button[data-action="delete"]');

    btnEdit.addEventListener('click', () => {
      editingActiveOrderId = order.id;
      currentOrder = JSON.parse(JSON.stringify(order));
      inputTableNumber.value = currentOrder.tableNumber;
      selectClient.value = currentOrder.clientId || '';
      selectPaymentMethod.value = currentOrder.paymentMethod || '';
      updateOrderUI();
      showSection('new-order');
    });

    btnDelete.addEventListener('click', () => {
      if (confirm(`Deseja realmente excluir a comanda da mesa ${order.tableNumber}?`)) {
        activeOrders = activeOrders.filter(o => o.id !== order.id);
        saveActiveOrders();
        renderActiveOrdersTable();
        logAction(`Comanda excluída: Mesa ${order.tableNumber}`);
      }
    });

    activeOrdersTableBody.appendChild(tr);
  });
}

// Open report modal and render finalized orders
function openReportModal() {
  modalReport.classList.remove('hidden');
  renderReportContent();
  btnCloseReport.focus();
}

btnCloseReport.addEventListener('click', () => {
  modalReport.classList.add('hidden');
});

function renderReportContent() {
  if (finalizedOrders.length === 0) {
    reportContent.innerHTML = '<p>Nenhuma comanda finalizada para exibir.</p>';
    return;
  }
  let html = '<table class="w-full text-left text-gray-800 text-sm border border-gray-300 rounded">';
  html += `
    <thead class="bg-indigo-100 border-b border-indigo-300">
      <tr>
        <th class="py-2 px-3 border-r border-indigo-300">ID</th>
        <th class="py-2 px-3 border-r border-indigo-300">Mesa</th>
        <th class="py-2 px-3 border-r border-indigo-300">Cliente</th>
        <th class="py-2 px-3 border-r border-indigo-300">Itens</th>
        <th class="py-2 px-3 border-r border-indigo-300">Total (R$)</th>
        <th class="py-2 px-3 border-indigo-300">Data</th>
      </tr>
    </thead>
    <tbody>
  `;
  finalizedOrders.forEach(order => {
    const total = order.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const date = new Date(order.date);
    const dateStr = date.toLocaleDateString('pt-BR');
    const timeStr = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    html += `
      <tr>
        <td class="py-1 px-2 border-r border-indigo-300">${order.id}</td>
        <td class="py-1 px-2 border-r border-indigo-300">${order.tableNumber}</td>
        <td class="py-1 px-2 border-r border-indigo-300">${getClientNameById(order.clientId) || 'Nenhum'}</td>
        <td class="py-1 px-2 border-r border-indigo-300">${order.items.length}</td>
        <td class="py-1 px-2 border-r border-indigo-300">R$ ${total.toFixed(2).replace('.', ',')}</td>
        <td class="py-1 px-2 border-indigo-300">${dateStr} ${timeStr}</td>
      </tr>
    `;
  });
  html += '</tbody></table>';
  reportContent.innerHTML = html;
}

// Format payment method for display
function formatPaymentMethod(method) {
  switch (method) {
    case 'dinheiro': return 'Dinheiro';
    case 'cartao-debito': return 'Cartão Débito';
    case 'cartao-credito': return 'Cartão Crédito';
    case 'pix': return 'PIX';
    case 'outro': return 'Outro';
    default: return 'Desconhecido';
  }
}

// Initialize app
function init() {
  modalLogin.style.display = 'flex';
  mainContent.classList.add('hidden');
  renderMenu();
  renderClientSelect();
  renderClientsTable();
  renderProductsTable();
  loadActiveOrders();
  renderActiveOrdersTable();
  clearOrder();
}

init();

// Adiciona item ou incrementa quantidade
function addItemToOrder(product) {
  if (!currentOrder.tableNumber) {
    alert('Por favor, informe o número da mesa antes de adicionar itens.');
    inputTableNumber.focus();
    return;
  }
  const existingItem = currentOrder.items.find(i => i.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    currentOrder.items.push({ ...product, quantity: 1 });
  }
  updateOrderUI();
  logAction(`Item adicionado à comanda: ${product.name} (Mesa ${currentOrder.tableNumber})`);
}

// Atualiza a UI da comanda
function updateOrderUI() {
  if (currentOrder.items.length === 0) {
    orderItemsTbody.innerHTML = `
      <tr class="text-center text-gray-500">
        <td colspan="5" class="py-6">Nenhum item adicionado.</td>
      </tr>
    `;
    btnSubmitOrder.disabled = true;
    btnClearOrder.disabled = true;
  } else {
    orderItemsTbody.innerHTML = '';
    currentOrder.items.forEach(item => {
      const tr = document.createElement('tr');
      tr.classList.add('border-b', 'border-gray-200', 'hover:bg-indigo-50', 'transition');

      tr.innerHTML = `
        <td class="py-2 px-1 font-semibold">${item.name}</td>
        <td class="py-2 px-1 text-center">
          <div class="inline-flex items-center border border-gray-300 rounded overflow-hidden">
            <button class="px-2 py-1 text-indigo-600 hover:bg-indigo-100 focus:outline-none" data-action="decrease" aria-label="Diminuir quantidade do item ${item.name}"><i class="fas fa-minus"></i></button>
            <input type="number" min="1" value="${item.quantity}" class="w-12 text-center border-l border-r border-gray-300 focus:outline-none" aria-label="Quantidade do item ${item.name}" />
            <button class="px-2 py-1 text-indigo-600 hover:bg-indigo-100 focus:outline-none" data-action="increase" aria-label="Aumentar quantidade do item ${item.name}"><i class="fas fa-plus"></i></button>
          </div>
        </td>
        <td class="py-2 px-1 text-right">R$ ${item.price.toFixed(2).replace('.', ',')}</td>
        <td class="py-2 px-1 text-right font-semibold">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</td>
        <td class="py-2 px-1 text-center">
          <button class="text-red-600 hover:text-red-800 focus:outline-none" aria-label="Remover item ${item.name}" data-action="remove"><i class="fas fa-trash-alt"></i></button>
        </td>
      `;

      const btnDecrease = tr.querySelector('button[data-action="decrease"]');
      const btnIncrease = tr.querySelector('button[data-action="increase"]');
      const btnRemove = tr.querySelector('button[data-action="remove"]');
      const inputQty = tr.querySelector('input[type="number"]');

      btnDecrease.addEventListener('click', () => {
        if (item.quantity > 1) {
          item.quantity--;
          updateOrderUI();
          logAction(`Quantidade do item ${item.name} diminuída para ${item.quantity} (Mesa ${currentOrder.tableNumber})`);
        }
      });
      btnIncrease.addEventListener('click', () => {
        item.quantity++;
        updateOrderUI();
        logAction(`Quantidade do item ${item.name} aumentada para ${item.quantity} (Mesa ${currentOrder.tableNumber})`);
      });
      btnRemove.addEventListener('click', () => {
        currentOrder.items = currentOrder.items.filter(i => i.id !== item.id);
        updateOrderUI();
        logAction(`Item removido da comanda: ${item.name} (Mesa ${currentOrder.tableNumber})`);
      });
      inputQty.addEventListener('change', (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 1) val = 1;
        item.quantity = val;
        updateOrderUI();
        logAction(`Quantidade do item ${item.name} alterada para ${item.quantity} (Mesa ${currentOrder.tableNumber})`);
      });

      orderItemsTbody.appendChild(tr);
    });
    btnSubmitOrder.disabled = false;
    btnClearOrder.disabled = false;
  }

  // Atualiza total
  const total = currentOrder.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  orderTotalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Limpar comanda
function clearOrder() {
  currentOrder = {
    tableNumber: null,
    clientId: null,
    items: [],
    paymentMethod: null,
  };
  inputTableNumber.value = '';
  selectClient.value = '';
  selectPaymentMethod.value = '';
  updateOrderUI();
  btnSubmitOrder.disabled = true;
  btnClearOrder.disabled = true;
}

btnClearOrder.addEventListener('click', () => {
  if (confirm('Deseja realmente limpar a comanda atual? Todos os itens serão removidos.')) {
    clearOrder();
    logAction('Comanda atual limpa');
  }
});

// Atualiza número da mesa no estado
inputTableNumber.addEventListener('input', (e) => {
  const val = e.target.value.trim();
  if (val === '' || parseInt(val) < 1) {
    currentOrder.tableNumber = null;
  } else {
    currentOrder.tableNumber = parseInt(val);
  }
  updateOrderUI();
});

// Atualiza cliente selecionado
selectClient.addEventListener('change', (e) => {
  currentOrder.clientId = e.target.value || null;
});

// Atualiza forma de pagamento
selectPaymentMethod.addEventListener('change', (e) => {
  currentOrder.paymentMethod = e.target.value || null;
});

// Finalizar comanda (abre modal)
document.getElementById('order-form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!currentOrder.tableNumber) {
    alert('Informe o número da mesa antes de finalizar a comanda.');
    inputTableNumber.focus();
    return;
  }
  if (currentOrder.items.length === 0) {
    alert('Adicione pelo menos um item para finalizar a comanda.');
    return;
  }
  if (!currentOrder.paymentMethod) {
    alert('Selecione a forma de pagamento.');
    selectPaymentMethod.focus();
    return;
  }
  orderToFinalize = JSON.parse(JSON.stringify(currentOrder));
  openConfirmModal();
});

// Modal confirm handlers
function openConfirmModal() {
  modalConfirm.classList.remove('hidden');
  btnCancelModal.focus();
}
function closeConfirmModal() {
  modalConfirm.classList.add('hidden');
}

btnCancelModal.addEventListener('click', () => {
  closeConfirmModal();
});

btnConfirmModal.addEventListener('click', () => {
  finalizeOrder();
  closeConfirmModal();
});

// Finaliza a comanda: salva em finalizadas e limpa
function finalizeOrder() {
  if (!orderToFinalize) return;
  orderToFinalize.id = Date.now();
  orderToFinalize.date = new Date().toISOString();
  orderToFinalize.user = currentUser.username;
  finalizedOrders.push(orderToFinalize);
  localStorage.setItem('finalizedOrders', JSON.stringify(finalizedOrders));
     logAction(`Comanda finalizada (Mesa ${orderToFinalize.tableNumber}, Cliente ${getClientNameById(orderToFinalize.clientId) || 'Nenhum'}, Total R$ ${orderToFinalize.items.reduce((acc,i)=>acc+i.price*i.quantity,0).toFixed(2)})`);

     // Remove from activeOrders if exists
     activeOrders = activeOrders.filter(o => o.id !== orderToFinalize.id);
     saveActiveOrders();

     // Gera nota fiscal
     generateInvoice(orderToFinalize);

     clearOrder();
     orderToFinalize = null;
     showSection('new-order');
   }

   // Gerar nota fiscal (exibir modal)
   function generateInvoice(order) {
     let client = getClientById(order.clientId);
     let total = order.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
     let date = new Date(order.date);
     let dateStr = date.toLocaleDateString('pt-BR');
     let timeStr = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

     let html = `
       <p><strong>Comanda Nº:</strong> ${order.id}</p>
       <p><strong>Data:</strong> ${dateStr} ${timeStr}</p>
       <p><strong>Mesa:</strong> ${order.tableNumber}</p>
       <p><strong>Cliente:</strong> ${client ? client.name : 'Nenhum'}</p>
       <p><strong>Atendente:</strong> ${order.user}</p>
       <p><strong>Forma de Pagamento:</strong> ${formatPaymentMethod(order.paymentMethod)}</p>
       <hr class="my-2" />
       <table class="w-full text-left text-gray-800 text-sm border border-gray-300 rounded mb-2">
         <thead class="bg-indigo-100 border-b border-indigo-300">
           <tr>
             <th class="py-1 px-2 border-r border-indigo-300">Produto</th>
             <th class="py-1 px-2 border-r border-indigo-300 text-center">Qtd</th>
             <th class="py-1 px-2 border-r border-indigo-300 text-right">Preço Unit.</th>
             <th class="py-1 px-2 text-right">Subtotal</th>
           </tr>
         </thead>
         <tbody>
     `;

     order.items.forEach(item => {
       html += `
         <tr>
           <td class="py-1 px-2 border-r border-indigo-300">${item.name}</td>
           <td class="py-1 px-2 border-r border-indigo-300 text-center">${item.quantity}</td>
           <td class="py-1 px-2 border-r border-indigo-300 text-right">R$ ${item.price.toFixed(2).replace('.', ',')}</td>
           <td class="py-1 px-2 text-right">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</td>
         </tr>
       `;
     });

     html += `
         </tbody>
       </table>
       <p class="text-right font-semibold text-lg">Total: R$ ${total.toFixed(2).replace('.', ',')}</p>
     `;

     invoiceContent.innerHTML = html;
     modalInvoice.classList.remove('hidden');
     btnCloseInvoice.focus();
   }

   btnCloseInvoice.addEventListener('click', () => {
     modalInvoice.classList.add('hidden');
   });

   btnPrintInvoice.addEventListener('click', () => {
     const printWindow = window.open('', '', 'width=800,height=600');
     printWindow.document.write('<html><head><title>Nota Fiscal</title>');
     printWindow.document.write('<style>body{font-family: Arial, sans-serif; padding: 20px;} table{width: 100%; border-collapse: collapse;} th, td{border: 1px solid #ccc; padding: 8px;}</style>');
     printWindow.document.write('</head><body>');
     printWindow.document.write(invoiceContent.innerHTML);
       printWindow.document.write('</body></html>');
     });
