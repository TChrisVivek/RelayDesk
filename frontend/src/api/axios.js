import axios from 'axios';
import { 
    mockProjects, 
    mockPersonnel, 
    mockExpenses, 
    mockBlueprints, 
    mockInventory, 
    mockMessages, 
    mockDashboardData,
    mockReports,
    mockBudget,
    mockUsers
} from './mockData';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Mock interceptor to bypass backend
api.interceptors.request.use((config) => {
    // For demo purposes, we will mock responses directly via adapter if possible, 
    // or we can reject the request and handle it in the interceptors.response.
    // However, a standard approach for complete frontend mocking is adapting the response:
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Fallback to mock data if the backend is not reachable or disconnected
        const url = error.config?.url || '';
        const method = error.config?.method || 'get';
        
        let data = {};
        
        if (url.includes('/budget')) {
            data = mockBudget;
        } else if (url.includes('/reports')) {
            data = mockReports || [];
        } else if (url.includes('/users') && !url.includes('/auth/me')) {
            data = mockUsers;
        } else if (url.includes('/auth/google') || url.includes('/auth/me')) {
            data = { 
                token: 'demo-token', 
                _id: 'demo_user', 
                username: 'Demo Admin', 
                email: 'demo@relaydesk.com', 
                role: 'Admin', 
                status: 'Active' 
            };
            if (url.includes('/auth/google')) {
                data = { token: 'demo-token', user: data };
            }
        } else if (url.includes('/expenses')) {
            data = mockExpenses;
        } else if (url.includes('/projects')) {
            const parts = url.split('?')[0].split('/').filter(Boolean);
            const pIdx = parts.indexOf('projects');
            if (pIdx !== -1) {
                const subPath = parts[pIdx + 1];
                const action = parts[pIdx + 2];

                if (action) {
                    if (action === 'inventory') data = mockInventory;
                    else if (action === 'personnel') data = { 
                        internalTeam: mockPersonnel, 
                        externalVendors: [
                            { id: 'v1', company: 'Apex Builders', trade: 'Masonry', contactPerson: 'John Apex', icon: 'ruler' },
                            { id: 'v2', company: 'Volt Electricals', trade: 'Electrical', contactPerson: 'Jane Volt', icon: 'zap' }
                        ],
                        stats: {
                            totalAssigned: 12,
                            currentlyOnSite: 8,
                            externalVendors: 2,
                            safetyIncidents: 0
                        }
                    };
                    else if (action === 'daily-logs') data = { projectPhase: 'Execution Phase', lastUpdated: 'Just now', logs: [] };
                    else if (action === 'expenses') data = mockExpenses;
                    else if (action === 'blocks') {
                        const blockId = parts[pIdx + 3];
                        const blockAction = parts[pIdx + 4];
                        const blocks = [
                            { _id: 'b1', name: 'Tower A - North Wing', description: 'Primary residential tower', status: 'In Progress', progress: 45 },
                            { _id: 'b2', name: 'Tower B - South Wing', description: 'Secondary residential tower', status: 'Planning', progress: 0 }
                        ];
                        if (blockAction === 'daily-logs') {
                            data = { projectPhase: 'Execution Phase', lastUpdated: 'Just now', logs: [] };
                        } else if (blockAction === 'blueprints') {
                            data = mockBlueprints;
                        } else if (blockId) {
                            data = blocks.find(b => b._id === blockId) || blocks[0];
                        } else {
                            data = blocks;
                        }
                    }
                    else data = []; // default for feed, tasks, pins, etc.
                } else if (subPath) {
                    data = mockProjects.find(p => p._id === subPath) || mockProjects[0];
                } else {
                    data = mockProjects;
                }
            }
        } else if (url.includes('/personnel')) {
            data = mockPersonnel;
        } else if (url.includes('/inventory')) {
            data = mockInventory;
        } else {
            // Default generic response
            data = { success: true, message: 'Mock action successful', data: [] };
        }
        
        console.log(`[Mock API] Intercepted ${method.toUpperCase()} ${url}`, data);
        
        // Resolve with mock data
        return Promise.resolve({
            data: data,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: error.config
        });
    }
);

export default api;
