import fs from 'fs';
import path from 'path';
import { Order } from '@/types';

const STORE_PATH = path.join(process.cwd(), 'src', 'data', 'orders_store.json');

export function getStoredOrders(): Order[] {
  try {
    if (!fs.existsSync(STORE_PATH)) {
      return [];
    }
    const raw = fs.readFileSync(STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading orders_store.json:', err);
    return [];
  }
}

export function saveStoredOrder(newOrder: Order): Order[] {
  try {
    const existing = getStoredOrders();
    const filtered = existing.filter((o) => o.id !== newOrder.id);
    const updated = [newOrder, ...filtered];
    
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(updated, null, 2), 'utf8');
    return updated;
  } catch (err) {
    console.error('Error saving order to orders_store.json:', err);
    return [];
  }
}
