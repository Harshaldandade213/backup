import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { TrendingUp, TrendingDown, Wallet, DollarSign } from 'lucide-react';

export const AccountsPage: React.FC = () => {
  const { fees, salaries } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Calculate income (from fees)
  const totalFeeIncome = fees.filter(f => f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0);
  const pendingFees = fees.filter(f => f.status === 'Pending' || f.status === 'Overdue').reduce((sum, f) => sum + f.amount, 0);

  // Calculate expenses (from salaries)
  const totalSalaryExpense = salaries.filter(s => s.status === 'Paid').reduce((sum, s) => sum + s.netSalary, 0);
  const pendingSalary = salaries.filter(s => s.status === 'Pending').reduce((sum, s) => sum + s.netSalary, 0);

  // Net balance
  const netBalance = totalFeeIncome - totalSalaryExpense;

  // Recent transactions (combined fees and salaries)
  const recentTransactions = [
    ...fees.filter(f => f.status === 'Paid').slice(0, 5).map(f => ({
      id: f.id,
      type: 'Income',
      description: `Fee payment - ${f.feeType}`,
      amount: f.amount,
      date: f.paidDate!,
      status: 'Completed',
    })),
    ...salaries.filter(s => s.status === 'Paid').slice(0, 5).map(s => ({
      id: s.id,
      type: 'Expense',
      description: `Salary payment - ${s.month} ${s.year}`,
      amount: s.netSalary,
      date: s.paidDate!,
      status: 'Completed',
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gray-900">Accounts</h1>
        <div className="flex items-center gap-2">
          <Button size="sm" variant={selectedPeriod === 'month' ? 'primary' : 'secondary'} onClick={() => setSelectedPeriod('month')}>
            This Month
          </Button>
          <Button size="sm" variant={selectedPeriod === 'year' ? 'primary' : 'secondary'} onClick={() => setSelectedPeriod('year')}>
            This Year
          </Button>
          <Button size="sm" variant={selectedPeriod === 'all' ? 'primary' : 'secondary'} onClick={() => setSelectedPeriod('all')}>
            All Time
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+12.5%</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Income</p>
          <p className="text-green-600">₹{totalFeeIncome.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">+8.2%</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
          <p className="text-red-600">₹{totalSalaryExpense.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">Balance</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Net Balance</p>
          <p className={netBalance >= 0 ? 'text-blue-600' : 'text-red-600'}>
            ₹{netBalance.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">Pending</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Pending Fees</p>
          <p className="text-yellow-600">₹{pendingFees.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-gray-900">Recent Transactions</h2>
            <Button size="sm" variant="ghost">View All</Button>
          </div>
          <div className="divide-y divide-gray-200">
            {recentTransactions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No transactions yet
              </div>
            ) : (
              recentTransactions.map((transaction) => (
                <div key={transaction.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'Income' 
                          ? 'bg-green-100' 
                          : 'bg-red-100'
                      }`}>
                        {transaction.type === 'Income' ? (
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{transaction.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(transaction.date).toLocaleDateString('en-GB')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm ${
                        transaction.type === 'Income' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {transaction.type === 'Income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">{transaction.status}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-gray-900 mb-4">Income Breakdown</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tuition Fees</span>
                <span className="text-gray-900">₹{totalFeeIncome.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Admission Fees</span>
                <span className="text-gray-900">₹0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Other Income</span>
                <span className="text-gray-900">₹0</span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">Total</span>
                  <span className="text-green-600">₹{totalFeeIncome.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-gray-900 mb-4">Expense Breakdown</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Staff Salaries</span>
                <span className="text-gray-900">₹{totalSalaryExpense.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Infrastructure</span>
                <span className="text-gray-900">₹0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Other Expenses</span>
                <span className="text-gray-900">₹0</span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">Total</span>
                  <span className="text-red-600">₹{totalSalaryExpense.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
