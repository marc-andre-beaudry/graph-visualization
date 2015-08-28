package com.maillets.graphvisu.controller;

public class Link {

	private int source;
	private int target;
	private int value = (int) (Math.random() * 9 + 1);

	public int getSource() {
		return source;
	}

	public void setSource(int source) {
		this.source = source;
	}

	public int getTarget() {
		return target;
	}

	public void setTarget(int target) {
		this.target = target;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}
}
