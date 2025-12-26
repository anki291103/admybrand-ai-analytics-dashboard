// src/views/ProductsView.tsx
"use client";
import React, { useState, useMemo } from 'react';
import { productsData, type Product } from "@/lib/data/productsData";
import { FaSearch, FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Added Chevron icons
import { ITEMS_PER_PAGE } from '@/lib/constants'; // Add this line
type SortKey = keyof Product;
type SortDirection = 'asc' | 'desc';

const ProductsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(ITEMS_PER_PAGE);
  const filteredProducts = useMemo(() => {
    return productsData.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const sortedProducts = useMemo(() => {
    if (!sortConfig) {
      return filteredProducts;
    }
    const sortableProducts = [...filteredProducts];
    sortableProducts.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }
      return 0; // Fallback
    });
    return sortableProducts;
  }, [filteredProducts, sortConfig]);

  // Calculate items for the current page
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page on sort
  };

  const getSortIcon = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    if (typeof productsData[0]?.[key] === 'string') {
      return sortConfig.direction === 'asc' ? <FaSortAlphaUp className="ml-1" /> : <FaSortAlphaDown className="ml-1" />;
    } else if (typeof productsData[0]?.[key] === 'number') {
      return sortConfig.direction === 'asc' ? <FaSortNumericUp className="ml-1" /> : <FaSortNumericDown className="ml-1" />;
    }
    return null;
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Product Catalog</h2>

      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search products by name or category..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Product Summary Cards (Mini-charts/metrics) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm flex flex-col items-center">
          <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">{productsData.length}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Total Products</span>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm flex flex-col items-center">
          <span className="text-3xl font-bold text-green-600 dark:text-green-400">{productsData.filter(p => p.stock > 0).length}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">In Stock</span>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm flex flex-col items-center">
          <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">₹{(productsData.reduce((sum, p) => sum + p.revenue, 0) / 1000000).toFixed(1)}M</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</span>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto flex-grow">
        <table className="min-w-full leading-normal table-auto">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              {['name', 'category', 'price', 'stock', 'unitsSold', 'revenue', 'lastUpdated', 'status'].map(key => (
                <th
                  key={key}
                  className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-600 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => requestSort(key as SortKey)}
                >
                  <div className="flex items-center">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    {getSortIcon(key as SortKey)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map(product => (
                <tr key={product.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-5 py-3 text-sm text-gray-700 dark:text-gray-200">{product.name}</td>
                  <td className="px-5 py-3 text-sm text-gray-700 dark:text-gray-200">{product.category}</td>
                  <td className="px-5 py-3 text-sm text-gray-700 dark:text-gray-200">₹{product.price.toLocaleString()}</td>
                  <td className="px-5 py-3 text-sm text-gray-700 dark:text-gray-200">{product.stock}</td>
                  <td className="px-5 py-3 text-sm text-gray-700 dark:text-gray-200">{product.unitsSold}</td>
                  <td className="px-5 py-3 text-sm text-gray-700 dark:text-gray-200">₹{product.revenue.toLocaleString()}</td>
                  <td className="px-5 py-3 text-sm text-gray-700 dark:text-gray-200">{product.lastUpdated}</td>
                  <td className="px-5 py-3 text-sm">
                    <span className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full
                      ${product.status === 'available' ? 'text-green-900 bg-green-200' :
                        product.status === 'out_of_stock' ? 'text-yellow-900 bg-yellow-200' :
                        'text-red-900 bg-red-200'}`
                    }>
                      {product.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-5 py-5 text-center text-gray-500 dark:text-gray-400">No products found matching your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FaChevronLeft className="mr-2" /> Previous
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-200">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next <FaChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ProductsView;