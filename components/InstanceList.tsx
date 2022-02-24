import React from 'react';
import Instance from './Instance';

type Props = {
  instancesNames?: string[];
};

const InstanceList = ({ instancesNames }: Props) => {
  const instances: JSX.Element[] = [];
  instancesNames.forEach((instanceName) => {
    instances.push(<Instance name={instanceName} key={instanceName} />);
  });

  return <div className="flex flex-wrap gap-2 justify-center">{instances}</div>;
};

export default InstanceList;
