export const generateSelectOptions = (options, keyName) => {
  if (options && options.length) {
    let selectOptions = [];
    for (var i = 0; i < options.length; i++) {
      selectOptions.push({
        value: options[i].id,
        label: keyName ? options[i][keyName] : options[i].name,
      });
    }

    return selectOptions;
  }

  return [];
};

export const generateSingleSelectOption = (option, keyName) => {
  if (option && option.id) {
    return {
      value: option.id,
      label: keyName ? option[keyName] : option.name,
    };
  }

  return {};
};
