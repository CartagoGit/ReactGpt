import { NavLink } from 'react-router-dom';
import { IMenuRoutes } from '../../router/main-router';

export const SidebarMenuItem = ({ route }: { route: IMenuRoutes }) => {
	const { to, icon, title, description } = route;
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				`flex justify-center items-center rounded-md p-2 transition-colors ${
					isActive ? ' bg-gray-800' : 'hover:bg-gray-800'
				}`
			}>
			<i className={`${icon} text-2xl mr-4 text-indigo-400`}></i>
			<div className="flex flex-col flex-grow">
				<span className="text-white text-lg font-semibold">
					{title}
				</span>
				<span className="text-gray-400 text-sm">{description}</span>
			</div>
		</NavLink>
	);
};
