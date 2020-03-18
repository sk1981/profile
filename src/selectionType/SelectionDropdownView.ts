import { h } from "snabbdom";
import SelectionDropdownIndexView from "./SelectionDropdownIndexView";

export default {
  renderListIndexView(
    filteredOptions = [],
    text = "",
    highlightedOptionIndex: number,
    handler: any
  ) {
    const filterOptions = filteredOptions.map((option, index) => {
      const isFocused = index === highlightedOptionIndex;
      return SelectionDropdownIndexView.render(
        { option: option, highlight: text, isFocused },
        handler
      );
    });
    return filterOptions.length === 0
      ? [
          h(
            "li.select-type__index.select-type__index--none",
            {},
            "No Results Founds"
          )
        ]
      : filterOptions;
  },

  render(data: any, handler: any) {
    return h(`div.select-type__dropdown`, {}, [
      h(
        "ul.select-type__list",
        {
          key: 1,
          attrs: {
            role: "listbox",
            id: "select-filter-dropdown",
            "aria-hidden": !data.active
          }
        },
        this.renderListIndexView(
          data.filteredOptions,
          data.text,
          data.highlightedOptionIndex,
          handler
        )
      )
    ]);
  }
};
