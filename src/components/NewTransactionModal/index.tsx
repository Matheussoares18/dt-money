import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';
import { Container, RadioBox, TransactionTypeContainer } from './styles';
import { api } from '../../services/api';

import CloseImg from '../../assets/close.svg';
import IncomeImg from '../../assets/income.svg';
import OutcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

export function NewTransactionModal(props: NewTransactionModalProps) {
	const { createTransaction } = useTransactions();
	const [type, setType] = useState<'deposit' | 'withdraw'>('deposit');
	const { isOpen, onRequestClose } = props;
	const [title, setTitle] = useState<string>('');
	const [amount, setAmount] = useState<number>(0);
	const [category, setCategory] = useState<string>('');

	async function handleCreateNewTransaction(event: FormEvent) {
		event.preventDefault();

		await createTransaction({
			title,
			amount,
			category,
			type,
		});

		setTitle('');
		setAmount(0);
		setCategory('');
		setType('deposit');
		onRequestClose();
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			overlayClassName="react-modal-overlay"
			className="react-modal-content"
		>
			<button
				type="button"
				onClick={onRequestClose}
				className="react-modal-close"
			>
				<img src={CloseImg} alt="Fechar modal" />
			</button>
			<Container onSubmit={handleCreateNewTransaction}>
				<h2>Cadastrar transação</h2>
				<input
					type="text"
					placeholder="Título"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					type="number"
					placeholder="Valor"
					value={amount}
					onChange={(e) => setAmount(Number(e.target.value))}
				/>
				<TransactionTypeContainer>
					<RadioBox
						type="button"
						onClick={() => setType('deposit')}
						isActive={type === 'deposit'}
						activeColor="green"
					>
						<img src={IncomeImg} alt="Entrada" />
						<span>Entrada</span>
					</RadioBox>
					<RadioBox
						type="button"
						onClick={() => setType('withdraw')}
						isActive={type === 'withdraw'}
						activeColor="red"
					>
						<img src={OutcomeImg} alt="Saída" />
						<span>Saída</span>
					</RadioBox>
				</TransactionTypeContainer>
				<input
					type="text"
					placeholder="Categoria"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				/>

				<button type="submit">Cadastrar</button>
			</Container>
		</Modal>
	);
}
