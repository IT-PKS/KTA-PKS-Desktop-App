import React from 'react';

export type TemplateData = {
    isOpenMenu: boolean;
};

export interface TemplateDataContextType extends TemplateData {
    onMinimizeMenu: (newTemplateData: TemplateData) => void;
}

const initialTemplateData: TemplateData = {
    isOpenMenu: true,
};


export const TemplateDataContext = React.createContext<TemplateDataContextType>({
    ...initialTemplateData,
    onMinimizeMenu: () => { },
});



// Hooks
export const useTemplateDataContext = () => React.useContext(TemplateDataContext);

const TemplateDataProvider: React.FC = props => {
    const [templateData, setTemplateData] = React.useState<TemplateData>(initialTemplateData);

    const onMinimizeMenu = (value: any) => {
        setTemplateData({ ...templateData, isOpenMenu: value });
    }

    const TemplateDataValue = React.useMemo(() => {
        return {
            ...templateData,
            onMinimizeMenu,
        };
    }, [templateData]);

    return <TemplateDataContext.Provider value={TemplateDataValue} {...props} />;
};




export default TemplateDataProvider;
