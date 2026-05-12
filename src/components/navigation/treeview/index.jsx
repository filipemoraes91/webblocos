import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { useThemeContext } from "../../../context/themeContext";
import useFAQ from "../../../hooks/useFAQ";
import { useNavigate } from "react-router-dom";
import useRastreios from "../../../hooks/useRastreios";
import { useEffect, useState } from "react";
import { getStyles } from "./style";

function TreeView(props) {
  const { theme } = useThemeContext();
  const styles = getStyles(theme);
  return (
    <SimpleTreeView
      expandedItems={props.expandedItems}
      onExpandedItemsChange={props.onExpandedItemsChange}
      selectedItems={props.selectedItems}
      onSelectedItemsChange={props.onSelectedItemsChange}
      sx={styles.itens}
    >
      {props.children}
    </SimpleTreeView>
  );
}

export function TreeViewRastreios(props) {
  const { loadRastreios, getRastreios, rastreios } = useRastreios();
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    getRastreios();
  }, [loadRastreios]);

  const handleExpandedItemsChange = (event, itemIds) => {
    setExpandedItems(itemIds);
  };

  function renderTree(items, parentId) {
    return items
      .filter((item) => item.master === parentId)
      .map((item) => (
        <TreeItem
          key={item.codigo}
          itemId={item.codigo + ""}
          label={item.descricao}
        >
          {renderTree(items, item.codigo)}
        </TreeItem>
      ));
  }

  const handleSelect = (event, nodeIds) => {
    const newSelected = Array.isArray(nodeIds) ? nodeIds : [nodeIds];
    setSelectedItems(newSelected);
    if (rastreios && newSelected.length > 0) {
      const selectedCodigo = newSelected[0];
      const item = rastreios.find(
        (i) => String(i.codigo) === String(selectedCodigo),
      );
      props.getItem ? props.getItem(item) : null;
    }
  };

  return (
    <TreeView
      expandedItems={expandedItems}
      onExpandedItemsChange={handleExpandedItemsChange}
      selectedItems={selectedItems}
      onSelectedItemsChange={handleSelect}
    >
      {renderTree(rastreios || [], 0)}
    </TreeView>
  );
}

export function TreeViewMenuFaq() {
  const { getMenu, faqMenu, loadMenu, getFAQ, getAnFAQ } = useFAQ();
  const [expandedItems, setExpandedItems] = useState(["0"]);
  const [idSelect, setIdSelect] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMenu();
  }, [loadMenu]);

  const handleExpandedItemsChange = (event, itemIds) => {
    setExpandedItems(itemIds);
  };

  // const getAllItemIds = (items) => {
  //   return items.map((item) => item.codigo + "");
  // };
  // const handleExpandClick = () => {
  //   setExpandedItems((oldExpanded) => (oldExpanded.length === 0 && faqMenu ? getAllItemIds(faqMenu) : []));
  // };

  const handleSelect = (event, nodeIds) => {
    const newSelected = Array.isArray(nodeIds) ? nodeIds : [nodeIds];
    setSelectedItems(newSelected);
    if (faqMenu && newSelected.length > 0) {
      const selectedCodigo = newSelected[0];
      const item = faqMenu.find(
        (i) => String(i.codigo) === String(selectedCodigo),
      );

      if (item && item.idFAQ) {
        setIdSelect(item.idFAQ);
        navigate(`/faq/${item.idFAQ}`);
      } else {
        setIdSelect(0);
      }
    } else {
      setIdSelect(0);
    }
  };

  // useEffect(() => {
  //   if (idSelect > 0) {
  //     getFAQ(idSelect);
  //     getAnFAQ(idSelect);
  //   }
  // }, [idSelect]);

  // useEffect(() => {
  //   if (idSelect > 0) setFaqSelect({ ...faq, anotacoes: anFaq });
  // }, [loadFaq, loadAnFaq]);

  function renderTree(items, parentId) {
    return items
      .filter((item) => item.master === parentId)
      .map((item) => (
        <TreeItem
          key={item.codigo}
          itemId={item.codigo + ""}
          label={item.descricao}
        >
          {renderTree(items, item.codigo)}
        </TreeItem>
      ));
  }

  return (
    <TreeView
      expandedItems={expandedItems}
      onExpandedItemsChange={handleExpandedItemsChange}
      selectedItems={selectedItems}
      onSelectedItemsChange={handleSelect}
    >
      {renderTree(faqMenu || [], 0)}
    </TreeView>
  );
}
