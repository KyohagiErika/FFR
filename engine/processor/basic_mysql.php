<?php
/**
 * Simulate the SELECT query.
 * @param mysqli $dbc Database connection.
 * @param string $table_name Table name.
 * @param array $cols Columns to be selected.
 * @param array $conditions The conditions to be satisfied.
 * @param string $order_by
 * @param bool $asc
 * @return array|false Return an array of records if success.
 */
function basic_mysql_select(mysqli $dbc, string $table_name, array $cols = array(), array $conditions = array(), string $order_by = null, bool $asc = false) {
    $query = "SELECT ";
    if (count($cols) == 0) {
        $query .= "* ";
    } else {
        $query .= array_shift($cols);
        while (count($cols) > 0) {
            $query .= ", ".array_shift($cols);
        }
    }
    $query .= " FROM ".$table_name;
    if (count($conditions) > 0) {
        $query .= " WHERE ".array_shift($conditions);
        while (count($conditions) > 0) {
            $query .= " AND ".array_shift($conditions);
        }
    }
    if (!empty($order_by)) {
        $query .= " ORDER BY ".$order_by.($asc ? " ASC" : " DESC");
    }
    $result = mysqli_query($dbc,$query);
    if ($result) {
        $result_set = array();
        while ($record = mysqli_fetch_array($result,MYSQLI_ASSOC)) {
            $result_set[] = $record;
        }
        return $result_set;
    }
    return false;
}

/**
 * Simulate the INSERT query.
 * @param mysqli $dbc Database connection.
 * @param string $table_name Table name.
 * @param array $values Values of the columns.
 * @param array $cols Columns to be inserted to. Passing an empty array means inserting to all columns of the table.
 * @return bool The result of the process. True - success | False - failed.
 */
function basic_mysql_insert(mysqli $dbc, string $table_name, array $values, array $cols = array()) {
    $query = "INSERT INTO ".$table_name;
    if (count($cols) > 0) {
        $query .= " (".array_shift($cols);
        while (count($cols) > 0) {
            $query .= ", ".array_shift($cols);
        }
        $query .= ")";
    }
    $query .= " VALUES (";
    $value = mysqli_real_escape_string($dbc,array_shift($values));
    if (strtolower($value) == "null") {
        $query .= "".$value;
    } else {
        $query .= "'".$value."'";
    }
    while (count($values) > 0) {
        $value = mysqli_real_escape_string($dbc,array_shift($values));
        if (strtolower($value) == "null") {
            $query .= ",".$value;
        } else {
            $query .= ",'".$value."'";
        }
    }
    $query .= ")";
    if (mysqli_query($dbc,$query)) {
        return true;
    }
    return false;
}

/**
 * Simulate the UPDATE query.
 * @param mysqli $dbc Database connection.
 * @param string $table_name Table name.
 * @param array $update_cols Columns to be updated.
 * @param array $update_values The corresponding values to update.
 * @param array $conditions The conditions to be satisfied.
 * @return bool The result of the process. True - success | False - failed.
 */
function basic_mysql_update(mysqli $dbc, string $table_name, array $update_cols, array $update_values, array $conditions) {
    $update_value = mysqli_real_escape_string($dbc,array_shift($update_values));
    $query = "";
    if (strtolower($update_value) == "null") {
        $query .= "UPDATE ".$table_name." SET ".array_shift($update_cols)." = ".$update_value;
    } else {
        $query .= "UPDATE ".$table_name." SET ".array_shift($update_cols)." = '".$update_value."'";
    }
    while (count($update_cols) > 0) {
        $update_value = mysqli_real_escape_string($dbc,array_shift($update_values));
        if (strtolower($update_value) == "null") {
            $query .= ", ".array_shift($update_cols)." = ".$update_value;
        } else {
            $query .= ", ".array_shift($update_cols)." = '".$update_value."'";
        }

    }
    if (count($conditions) > 0) {
        $query .= " WHERE ".array_shift($conditions);
        while (count($conditions) > 0) {
            $query .= " AND ".array_shift($conditions);
        }
    }
    if (mysqli_query($dbc,$query)) {
        return true;
    }
    return false;
}

/**
 * Simulate the DELETE query.
 * @param mysqli $dbc Database connection.
 * @param string $table_name Table name.
 * @param array $conditions The conditions to be satisfied.
 * @return bool The result of the process. True - success | False - failed.
 */
function basic_mysql_delete(mysqli $dbc, string $table_name, array $conditions) {
    $query = "DELETE FROM ".$table_name." WHERE ".array_shift($conditions);
    while (count($conditions) > 0) {
        $query .= " AND ".array_shift($conditions);
    }
    if (mysqli_query($dbc,$query)) {
        return true;
    }
    return false;
}