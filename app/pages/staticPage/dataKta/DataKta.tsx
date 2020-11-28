/** @jsx jsx */
import React, { useState, useEffect, Fragment } from 'react'
import Card from 'components/deskstop/Card/Card'
import { jsx } from '@emotion/core';
import { getListUnverifiedMembers, postVerifiedMembers } from '../../../client/MemberClient'
import { useTheme } from 'emotion-theming';
import createStyles from './DataKta.styles';
import { Theme } from '../../../components/base/src/theme';
import Table from '../../../components/base/src/components/Table/Table'
import ListCheckBox from './ListCheckBox'
import {
	RegisterFormData,
	SelectOption
} from '../../../components/base/src/staticPages/Register/Register.formHelper';
import ValidasiInternet from '../validasi/ValidasiInternet'

// Components
import {
	Column,
	FormGroup,
	Button,
	Row,
	Checkbox,
	Select,
	Icon
} from 'kta-ui-components';

type iProps = {
	defaultValues?: { [K in keyof RegisterFormData]?: RegisterFormData[K] };
	state?: 'default' | 'success' | 'failed';
	onSubmit(): any;
	/** @default false */
	loading?: boolean;
	setState(value: any): any;
};

const DataKta: React.FC<iProps> = (props) => {
	const theme = useTheme<Theme>();
	const styles = createStyles(theme);
	const [datas, setDatas] = useState([])


	const [options, setOptions] = React.useState<any | []>({
		showEntris: [
			{ label: '10', value: '10', },
			{ label: '25', value: '25', },
			{ label: '50', value: '50', },
			{ label: '100', value: '100', },
		],
		tindakanMasal: [
			{ label: 'Hapus', value: 'DELETED', },
		]
	})

	const [columnsMain, setColumnsMain] = useState([
		{
			title: 'NIK',
			dataIndex: 'id_card',
			key: 'id_card',
			width: 200,
			sort: true,
		},
		{
			title: 'Nama Lengkap',
			dataIndex: 'fullname',
			key: 'fullname',
			width: 250,
		},
		{
			title: 'Alamat',
			dataIndex: 'address',
			key: 'address',
			width: 300,
		}
	])

	const [tindakanMasal, setTindankanMasal] = useState([])
	const [checkInternet, setCheckInternet] = React.useState<Boolean>(true)
	const [messageSubmit, setMessageSubmit] = useState<string>("default")
	const [isTableLoading, setIsTableLoading] = useState<boolean>(false)
	const [isBulkLoading, setIsBulkLoading] = useState<boolean>(false)
	const [page, setPage] = useState<number>(1)
	const [perPage, setPerPage] = useState<number>(10)
	const [selectAll, setSelectAll] = useState<boolean>(false)
	const [idAll, setIdAll] = useState<any>([])
	const [selected, setSelected] = useState<any>([])
	// const [sortCol, setSortCol] = useState<number>(1)
	// const [sortBy, setSortBy] = useState<number>(1)

	const [currentPage, setCurrentPage] = useState<number>(1)
	const [total, setTotal] = useState<number>(1)
	const [lastPage, setLastPage] = useState<number>(1)

	const [defaultValue, setDefaultValue] = useState<any>({
		showEntris: [{ label: '10', value: '10', }],
		tindakanMasal: null
	})


	const handleSelectOnChange = (e: any, type: string) => {
		switch (type) {
			case 'showEntris':
				setPerPage(e.value)
				setDefaultValue({ ...defaultValue, showEntris: e })
				break;
			case 'tindakanMasal':
				setTindankanMasal(e.value)
				setDefaultValue({ ...defaultValue, tindakanMasal: e })
				break
		}
	}

	const _handleBodyCheckboxChange = (e: any, record: any) => {
		const { checked } = e.target;
		const id = record.id

		if (checked) {
			setSelected([...selected, id])
		} else {
			const array = [...selected];
			const deleteIndex = array.indexOf(id);
			if (deleteIndex > -1) {
				array.splice(deleteIndex, 1);
			}
			setSelected(array)
		}
	}

	const showDetailMmber = (record: string) => async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();
		// this.props.dispatch(toggleModalMemberDetail());
		// this.props.dispatch(setModalMemberDetailData(record));
	};

	const CheckBoxHeader = () => (
		<Checkbox
			instanceId="checkbox-table-head"
			checked={selectAll}
			onChange={() => setSelectAll(!selectAll)}
		/>
	)

	const columns = [
		{
			title: <CheckBoxHeader />,
			key: 'checkbox',
			width: 40,
			render: (value: any, record: any) => {
				return (
					<Checkbox
						instanceId={record.key}
						checked={selected.includes(record.id) || selectAll}
						onChange={(e: any) => _handleBodyCheckboxChange(e, record)}
					/>
				);
			},
		},
	];

	const columnsTindakan = [{
		title: 'Tindakan',
		dataIndex: 'id',
		key: 'id',
		width: 150,
		render: (id: any) => {
			return (

				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<a style={{ padding: '5px', width: '75px', backgroundColor: '#000', color: '#fff', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}
						onClick={() => _handlePostMembers()}>
						<Icon name={'address-card'} />&nbsp;
									Lihat
							</a><br />
					<a style={{ padding: '5px', width: '86px', backgroundColor: '#47B920', color: '#fff', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}
						onClick={() => _handlePostMembers(id, "EDIT")}>
						<Icon name={'edit'} />&nbsp;
								Ubah
						</a><br />
					<a style={{ padding: '5px', width: '79px', backgroundColor: '#CE352D', color: '#fff', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}
						onClick={() => _handlePostMembers(id, "DELETED")}>
						<Icon name={'trash'} />&nbsp;
								Hapus
					</a>
				</div>

			)
		}
	}]
	const getPayload = () => ({
		page: page,
		limit: perPage,
		// sort_col: sortCol,
		// sort_by: sortBy,
	})


	const handlePageChange = async (pageNum: number) => {
		setPage(pageNum)
	};


	const handleSelectBulkChange = (selectedOption: any) => {
		const value = selectedOption && 'value' in selectedOption ? selectedOption.value : undefined;
		setDefaultValue({ ...defaultValue, tindakanMasal: selectedOption })
		setTindankanMasal(value)
	}



	const _getTableData = async () => {
		setIsTableLoading(true)
		const { data, meta } = await getListUnverifiedMembers(getPayload())
		setCurrentPage(meta?.current_page)
		setTotal(meta?.total)
		setLastPage(meta?.last_page)
		setDatas(data)
		setIsTableLoading(false)
		let arr = []
		for (let i = 0; i < data.length; i++) {
			arr.push(data[i].id)
		}
		setIdAll([...idAll, arr])
	}

	const _handlePostMembers = async (...args: any) => {
		setIsTableLoading(true)
		const [id, status, isBulk] = args
		const payload = {
			member_id: id,
			status: status
		}

		const { data } = await postVerifiedMembers(payload)
		if (isBulk) return data
		if (data.message === "Success Approved Member" || 'Success Removed Member') {
			setCheckInternet(false)
			setMessageSubmit("success")
			setIsTableLoading(false)
		} else {
			setMessageSubmit("failed")
			setCheckInternet(false)
		}
	}


	const _handleShowColumn = (e) => {
		const existingData = [...columnsMain]
		const { checked, name, value } = e.target
		const dataCheckBox = [{
			title: name,
			dataIndex: value,
			key: value,
			width: 200,
		}]
		if (checked) {
			setColumnsMain([...existingData, ...dataCheckBox])
		} else {
			const removeData = existingData.filter((obj) => {
				return obj.title !== name
			})
			setColumnsMain(removeData)
		}
	}


	const _handleSubmitBulkAction = async () => {
		setIsBulkLoading(true)
		let res;
		let idBulk = selectAll ? idAll[0] : selected
		for (const val of idBulk) {
			res = await _handlePostMembers(val, tindakanMasal, true)
			console.log("res", res)
			if (res.message !== "Success Approved Member" || res.message !== 'Success Removed Member') {
				setMessageSubmit("failed")
				setCheckInternet(false)
			}
		}

		if (res.message === "Success Approved Member" || res.message === 'Success Removed Member') {
			setMessageSubmit("success")
			setIsTableLoading(false)
			setIsBulkLoading(false)
			setCheckInternet(false)
		}
	}

	const handleBulkAction = () => {
		if (tindakanMasal === undefined) {
			alert('Tindakan massal belum dipilih')
		} else if (!selected.length && !idAll.length) {
			alert('Tidak ada data yang dicentang')
		} else {
			_handleSubmitBulkAction()
		}
	}

	const checkIncludes = (name: string) => {
		let res = false
		for (var i = 0; i < columnsMain.length; i++) {
			if (columnsMain[i].title == name) res = true;
		}
		return res
	}

	useEffect(() => {
		_getTableData()
	}, [])

	useEffect(() => {
		_getTableData()
	}, [page, perPage])

	const Content = () => (
		<Fragment>
			<h3>Tampilkan kolom :</h3>

			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{
					ListCheckBox.map((v, i) => {
						return (
							<div style={{ marginLeft: '10px' }}>
								<input
									type="checkbox"
									name={v.name}
									value={v.value}
									onChange={(e) => _handleShowColumn(e)}
									checked={checkIncludes(v.name)}
								/>
								<label>{v.name}</label>
							</div>
						)
					})
				}
			</div>
			<br />
			<Row>
				<Column col={[12, 12, 4]}>
					{/* Tindakan Masal */}
					<FormGroup>
						<Select<SelectOption>
							instanceId="select-bulk"
							defaultValue={defaultValue.tindakanMasal}
							options={options.tindakanMasal}
							onChange={(e: any) => handleSelectBulkChange(e)}
							placeholder="Tindakan masal"
							clearable
						/>
					</FormGroup>
				</Column>
				<Column col={[12, 12, 4]}>
					<Button
						icon={{ name: 'play-circle' }}
						type="submit"
						style={{ width: '113px', height: '35px' }}
						onClick={handleBulkAction}
						loading={isBulkLoading}
					>
						Eksekusi
				</Button>
				</Column>
				<Column col={[12, 12, 4]} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
					<span style={{ marginBottom: '15px' }}>Tampilkan</span>&nbsp;&nbsp;
					<span>
						<FormGroup style={{ width: '90px' }}>
							<Select<SelectOption>
								options={options.showEntris}
								defaultValue={defaultValue.showEntris}
								onChange={(e: any) => handleSelectOnChange(e, 'showEntris')}
							/>
						</FormGroup>
					</span>&nbsp;&nbsp;
				<span style={{ marginBottom: '15px' }}>entri</span>
				</Column>
			</Row>
			<Table
				columns={[...columns, ...columnsMain, ...columnsTindakan]}
				data={datas}
				loading={isTableLoading}
				pagination={{
					onPageChange: handlePageChange,
					currentPage: currentPage,
					perPage: perPage,
					totalData: total,
					totalPage: lastPage,
				}}
			/>

		</Fragment>
	)

	return (
		<Card>
			<Row>
				<Column>
					<h2 css={[styles.heading]}>Data KTA</h2>
				</Column>
				{
					checkInternet &&
					<Column>
						<div style={{ display: "flex", justifyContent: "flex-end" }}>
							<Button icon={{ name: "sync-alt", placement: "left" }}>Sinkronkan Data</Button>
						</div>
					</Column>
				}
			</Row>
			{
				checkInternet ?
					<Content /> :
					<ValidasiInternet state={messageSubmit} onNewValidate={() => setCheckInternet(true)} />
			}
		</Card>
	)
}

export default DataKta
