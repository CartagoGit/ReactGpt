import React from 'react';
import './TypingLoader.scss';

interface IProps {
    className?: React.HTMLAttributes<HTMLDivElement>['className']; 
}

export const TypingLoader = ({className}: IProps) => {
	return (
		<div className={`typing ${className}`}>
			<span className="circle scaling"></span>
			<span className="circle scaling"></span>
			<span className="circle scaling"></span>
		</div>
	);
};
