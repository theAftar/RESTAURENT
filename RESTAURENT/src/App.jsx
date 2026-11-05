import { useMemo, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Clock3,
  Coffee,
  DollarSign,
  Download,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  Sun,
  Table2,
  Ticket,
  Users,
  UtensilsCrossed,
  X,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import './App.css'

const navigation = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Orders', icon: ClipboardList, count: 12 },
  { label: 'Menu', icon: UtensilsCrossed },
  { label: 'Tables', icon: Table2 },
  { label: 'Customers', icon: Users },
  { label: 'Inventory', icon: Package },
]

const secondaryNavigation = [
  { label: 'Reports', icon: Ticket },
  { label: 'Settings', icon: Settings },
]

const chartData = [
  { day: 'Mon', revenue: 4200, orders: 36 },
  { day: 'Tue', revenue: 5100, orders: 43 },
  { day: 'Wed', revenue: 4600, orders: 39 },
  { day: 'Thu', revenue: 6200, orders: 51 },
  { day: 'Fri', revenue: 7100, orders: 64 },
  { day: 'Sat', revenue: 8650, orders: 77 },
  { day: 'Sun', revenue: 7950, orders: 68 },
]

const orders = [
  { id: '#RF-2048', customer: 'Olivia Martin', table: 'Table 08', items: 4, amount: '$84.20', status: 'Preparing', initials: 'OM', color: 'orange' },
  { id: '#RF-2047', customer: 'Ethan Walker', table: 'Table 03', items: 2, amount: '$42.50', status: 'Ready', initials: 'EW', color: 'blue' },
  { id: '#RF-2046', customer: 'Ava Thompson', table: 'Table 11', items: 3, amount: '$67.80', status: 'Completed', initials: 'AT', color: 'purple' },
  { id: '#RF-2045', customer: 'Noah Williams', table: 'Takeaway', items: 1, amount: '$18.00', status: 'Pending', initials: 'NW', color: 'green' },
  { id: '#RF-2044', customer: 'Sophia Brown', table: 'Table 02', items: 5, amount: '$112.40', status: 'Completed', initials: 'SB', color: 'pink' },
]

const popularItems = [
  { name: 'Truffle Mushroom Pasta', category: 'Main course', sold: 142, price: '$18.50', image: '🍝' },
  { name: 'Crispy Chicken Burger', category: 'Main course', sold: 128, price: '$14.00', image: '🍔' },
  { name: 'Salmon Avocado Bowl', category: 'Healthy choice', sold: 96, price: '$16.50', image: '🥗' },
]

function App() {
  const [activePage, setActivePage] = useState('Overview')
  const [isDark, setIsDark] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [range, setRange] = useState('This week')
  const [search, setSearch] = useState('')
  const [isOrderOpen, setIsOrderOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [toast, setToast] = useState('')

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) =>
        `${order.id} ${order.customer} ${order.table}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  )

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  const selectPage = (label) => {
    setActivePage(label)
    setIsSidebarOpen(false)
    if (label !== 'Overview') showToast(`${label} workspace is ready for the next setup step.`)
  }

  return (
    <div className={`app-shell ${isDark ? 'dark' : ''}`}>
      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><UtensilsCrossed size={19} strokeWidth={2.5} /></div>
          <span>Resto<span>Flow</span></span>
          <button className="mobile-close" onClick={() => setIsSidebarOpen(false)} aria-label="Close menu"><X size={20} /></button>
        </div>

        <div className="sidebar-content">
          <p className="nav-label">Workspace</p>
          <nav className="nav-list" aria-label="Primary navigation">
            {navigation.map(({ label, icon: Icon, count }) => (
              <button key={label} className={`nav-item ${activePage === label ? 'active' : ''}`} onClick={() => selectPage(label)}>
                <Icon size={18} />
                <span>{label}</span>
                {count && <span className="nav-count">{count}</span>}
              </button>
            ))}
          </nav>

          <p className="nav-label nav-label-spaced">Manage</p>
          <nav className="nav-list" aria-label="Management navigation">
            {secondaryNavigation.map(({ label, icon: Icon }) => (
              <button key={label} className={`nav-item ${activePage === label ? 'active' : ''}`} onClick={() => selectPage(label)}>
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon"><CircleHelp size={17} /></div>
            <div><strong>Need a hand?</strong><span>Visit our help center</span></div>
            <ChevronRight size={16} />
          </div>
          <div className="profile-card">
            <div className="avatar avatar-user">JD</div>
            <div className="profile-copy"><strong>James Davis</strong><span>Administrator</span></div>
            <MoreHorizontal size={18} className="muted-icon" />
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="menu-toggle" onClick={() => setIsSidebarOpen(true)} aria-label="Open menu"><Menu size={21} /></button>
          <div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><strong>{activePage}</strong></div>
          <div className="topbar-actions">
            <label className="search-box">
              <Search size={17} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search anything..." aria-label="Search dashboard" />
              <kbd>⌘ K</kbd>
            </label>
            <button className="icon-button theme-toggle" onClick={() => setIsDark(!isDark)} aria-label="Toggle dark mode">
              {isDark ? <Sun size={18} /> : <Sparkles size={18} />}
            </button>
            <div className="notification-wrap">
              <button className="icon-button notification-button" onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} aria-label="Show notifications">
                <Bell size={18} /><span className="notification-dot" />
              </button>
              {isNotificationsOpen && <div className="notification-popover"><strong>Notifications</strong><p><span className="dot orange-dot" /> 3 orders need your attention.</p><p><span className="dot red-dot" /> Chicken stock is running low.</p></div>}
            </div>
            <div className="top-avatar avatar-user">JD</div>
          </div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div>
              <p className="eyebrow">Thursday, October 24, 2024</p>
              <h1>Good morning, James <span>👋</span></h1>
              <p className="page-subtitle">Here&apos;s what&apos;s happening at your restaurant today.</p>
            </div>
            <div className="heading-actions">
              <button className="secondary-button" onClick={() => showToast('Report exported successfully.')}><Download size={16} /> Export report</button>
              <button className="primary-button" onClick={() => setIsOrderOpen(true)}><Plus size={17} /> New order</button>
            </div>
          </div>

          <section className="stats-grid" aria-label="Restaurant summary">
            <StatCard label="Total revenue" value="$24,680.00" change="+12.8%" positive icon={DollarSign} iconClass="orange" />
            <StatCard label="Total orders" value="1,284" change="+8.4%" positive icon={ShoppingBag} iconClass="purple" />
            <StatCard label="Total customers" value="864" change="+14.2%" positive icon={Users} iconClass="blue" />
            <StatCard label="Avg. order value" value="$19.22" change="-2.1%" icon={Coffee} iconClass="green" />
          </section>

          <section className="dashboard-grid">
            <div className="panel revenue-panel">
              <div className="panel-header">
                <div><h2>Revenue overview</h2><p>Track your revenue performance over time</p></div>
                <div className="select-wrap"><CalendarDays size={15} /><select value={range} onChange={(event) => setRange(event.target.value)} aria-label="Revenue date range"><option>This week</option><option>This month</option><option>This year</option></select><ChevronDown size={14} /></div>
              </div>
              <div className="revenue-total"><strong>$24,680</strong><span className="trend positive"><ArrowUpRight size={15} /> 12.8%</span><small>vs. previous period</small></div>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 4, left: -20, bottom: 0 }}>
                    <defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f26b38" stopOpacity={0.22} /><stop offset="100%" stopColor="#f26b38" stopOpacity={0} /></linearGradient></defs>
                    <CartesianGrid vertical={false} stroke="#ebe9e6" strokeDasharray="4 4" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9b9893', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9b9893', fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area type="monotone" dataKey="revenue" stroke="#f26b38" strokeWidth={2.5} fill="url(#revenueFill)" activeDot={{ r: 5, fill: '#f26b38', stroke: '#fff', strokeWidth: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="panel quick-panel">
              <div className="panel-header"><div><h2>Quick actions</h2><p>Common tasks, right at your fingertips</p></div></div>
              <div className="quick-actions">
                <QuickAction icon={ClipboardList} label="Create order" color="orange" onClick={() => setIsOrderOpen(true)} />
                <QuickAction icon={UtensilsCrossed} label="Add menu item" color="purple" onClick={() => showToast('Menu editor opened.')} />
                <QuickAction icon={Table2} label="Manage tables" color="blue" onClick={() => selectPage('Tables')} />
                <QuickAction icon={Users} label="Add customer" color="green" onClick={() => showToast('Customer form opened.')} />
              </div>
              <div className="shift-card"><div className="shift-icon"><Clock3 size={18} /></div><div><strong>Lunch shift</strong><span>11:00 AM — 4:00 PM</span></div><span className="live-badge"><i /> Live</span></div>
            </div>
          </section>

          <section className="bottom-grid">
            <div className="panel orders-panel">
              <div className="panel-header"><div><h2>Recent orders</h2><p>Keep an eye on your latest orders</p></div><button className="text-button" onClick={() => selectPage('Orders')}>View all <ChevronRight size={15} /></button></div>
              <div className="orders-table">
                <div className="table-row table-head"><span>Order</span><span>Customer</span><span>Items</span><span>Amount</span><span>Status</span><span /></div>
                {filteredOrders.map((order) => <div className="table-row" key={order.id}><span className="order-id">{order.id}<small>{order.table}</small></span><span className="customer-cell"><span className={`avatar avatar-${order.color}`}>{order.initials}</span>{order.customer}</span><span>{order.items} items</span><span className="amount">{order.amount}</span><span><StatusBadge status={order.status} /></span><button className="row-menu" aria-label={`More actions for ${order.id}`}><MoreHorizontal size={17} /></button></div>)}
                {!filteredOrders.length && <div className="empty-state">No orders match your search.</div>}
              </div>
            </div>
            <div className="panel popular-panel">
              <div className="panel-header"><div><h2>Popular items</h2><p>Your best-selling menu items</p></div><button className="icon-button small-button" aria-label="More popular item options"><MoreHorizontal size={17} /></button></div>
              <div className="popular-list">{popularItems.map((item, index) => <div className="popular-item" key={item.name}><div className={`food-thumb food-thumb-${index}`}>{item.image}</div><div className="food-copy"><strong>{item.name}</strong><span>{item.category}</span><div className="food-meta"><b>{item.sold} sold</b><em>·</em><span>{item.price}</span></div></div><span className="rank">0{index + 1}</span></div>)}</div>
              <button className="outline-button" onClick={() => selectPage('Menu')}>Manage menu <ChevronRight size={15} /></button>
            </div>
          </section>
        </div>
      </main>

      {isSidebarOpen && <button className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} aria-label="Close navigation" />}
      {isOrderOpen && <OrderModal onClose={() => setIsOrderOpen(false)} onCreate={() => { setIsOrderOpen(false); showToast('New order #RF-2049 created.') }} />}
      {toast && <div className="toast"><span className="toast-check">✓</span>{toast}</div>}
    </div>
  )
}

function StatCard({ label, value, change, positive, icon: Icon, iconClass }) {
  return <div className="stat-card"><div className={`stat-icon ${iconClass}`}><Icon size={18} /></div><span className="stat-label">{label}</span><strong>{value}</strong><span className={`trend ${positive ? 'positive' : 'negative'}`}>{positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{change} <small>vs. last week</small></span></div>
}

function QuickAction({ icon: Icon, label, color, onClick }) {
  return <button className="quick-action" onClick={onClick}><span className={`quick-icon ${color}`}><Icon size={18} /></span><span>{label}</span><ChevronRight size={15} className="quick-arrow" /></button>
}

function StatusBadge({ status }) {
  return <span className={`status-badge status-${status.toLowerCase()}`}><i />{status}</span>
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return <div className="chart-tooltip"><strong>{label}</strong><span>${payload[0].value.toLocaleString()}</span></div>
}

function OrderModal({ onClose, onCreate }) {
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="order-modal" onMouseDown={(event) => event.stopPropagation()}><div className="modal-header"><div><p className="eyebrow">Order workspace</p><h2>Create new order</h2></div><button className="icon-button" onClick={onClose} aria-label="Close order modal"><X size={18} /></button></div><label className="modal-label">Customer name<input className="modal-input" placeholder="e.g. Olivia Martin" autoFocus /></label><label className="modal-label">Table or order type<select className="modal-input"><option>Table 08</option><option>Table 03</option><option>Takeaway</option><option>Delivery</option></select></label><div className="modal-items"><div className="modal-label">Add items</div><button className="modal-item"><span>Truffle Mushroom Pasta</span><b>$18.50</b><Plus size={16} /></button><button className="modal-item"><span>Crispy Chicken Burger</span><b>$14.00</b><Plus size={16} /></button></div><div className="modal-total"><span>Estimated total</span><strong>$32.50</strong></div><button className="primary-button full-button" onClick={onCreate}>Create order <ArrowUpRight size={16} /></button></div></div>
}

export default App
