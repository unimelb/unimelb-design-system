Add the attribute `data-sortable` to the table, as in the example above and this will allow you to sort the table data by column. Please note, this will only work on a simple table with one `tbody` and 1:1 headings to columns. Text, numbers and currency amounts are supported ($, €, £ and ¥).

Sort type can be overridden by adding a `data-sort-as` attribute to the `th` column header, as in the example above. The two available sort types are `number` and `text`.

Initial ordering can be reversed on the first column, by adding `class="desc"`.