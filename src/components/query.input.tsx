import {
  useAutocomplete,
  AutocompleteGetTagProps,
} from '@mui/base/AutocompleteUnstyled';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import CheckIcon from '@mui/icons-material/Check';

import Option from '../models/option';

const QueryInput = ({...criteria}:any) => {
    const theOption: Option = {
      [criteria.title] : [],
    }
    const onOption = (e:any, value:any) => {
      theOption[criteria.title] = value;
      criteria.updateOption(theOption);
    }

    const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
    } = useAutocomplete({
        id: criteria.title,
        defaultValue: [],
        multiple: true,
        options: criteria.data,
        getOptionLabel: (option:any) => option,
        onChange: onOption
    });

  return (
    <Root>
      <div {...getRootProps()}>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {
            value.map((option: any, index: number) => (
              <StyledTag label={option} {...getTagProps({ index })} />
            ))
          }
          <input placeholder={criteria.title} {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof criteria.data).map((option:any, index:any) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
}

export default QueryInput;

const Root = styled('div')(
  ({ theme }) => `
  color: rgba(0,0,0,.85);
  font-size: 14px;
`,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 240px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 240px;
  border: 1px solid #199a9a;
  background-color: #fff;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: #0a3d3d;
  }

  &.focused {
    border-color: #116b6b;
    box-shadow: 0 0 0 2px #0f5c5c;
  }

  & input {
    background-color: #fff;
    color: rgba(0,0,0,.85);
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    border: 0;
    outline: 0;
  }
`,
);

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}

function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

const StyledTag = styled(Tag)<TagProps>(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff';
    background-color: #e6f7ff';
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    cursor: pointer;
    padding: 4px;
  }
`,
);
