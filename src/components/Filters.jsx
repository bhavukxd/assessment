const Filters = ({ search, setSearch, category, setCategory, sort, setSort, categories, clearFilters }) => {

  return (

    <div className="filters">

      <input

        type="text"

        placeholder="Search by name"

        value={search}

        onChange={(e) => setSearch(e.target.value)}

      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>

        <option value="">All Categories</option>

        {categories.map(cat => (

          <option key={cat} value={cat}>{cat}</option>

        ))}

      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>

        <option value="">Sort by price</option>

        <option value="low">Low to High</option>

        <option value="high">High to Low</option>

      </select>

      <button onClick={clearFilters}>Clear Filters</button>

    </div>

  );

};

export default Filters;