export default {
  reset: function(model: any) {
    model.active = false;
    model.text = '';
    model.filteredOptions = model.options;
    model.highlightedOptionIndex = -1;
    return model;
  },

  filterOptions: function(model: any, newText: string) {
    model.text = newText;
    const lowerCaseText = newText.toLowerCase();
    model.filteredOptions = model.options.filter((option: string) => option.toLowerCase().indexOf(lowerCaseText) > -1);
    //As filtered options have changed we need to ensure highlighted options are within range
    model.highlightedOptionIndex = Math.min(model.highlightedOptionIndex, model.filteredOptions.length - 1);
    return model;
  }
}