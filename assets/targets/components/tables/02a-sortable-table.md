Add the attribute `data-sortable` to the table, as in the example above and this will allow you to sort the table data by column. Please note, this will only work on a simple table with one `tbody` and 1:1 headings to columns.

Columns are ordered by a natural sort algorithm, so currency and patterned data (eg. unit codes) will sort as expected. This can be overridden by adding an attribute `data-sort-as="text"` to the column heading `th`, to use the older alphabetic sort instead (illustrated with the "Text" column above).

The table will now display unsorted until a column is chosen. If you want the table to run a sort at page load, you can add `data-sort-initial` to a column heading `th`.

There may be a circumstance where you don't want the make a column sortable, you can prevent it from acquiring sortable links by adding the attribute `data-sort-skip` to the column heading `th` ("Offer made" in the example above).

